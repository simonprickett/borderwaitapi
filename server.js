var express = require('express');
var cors = require('cors');
var httpRequest = require('request');
var xmlParser = require('xml2js');
var app = express();
var router = express.Router();
var port = process.env.PORT || 8888;


router.route('/status').get(
	function(request, response) {
		httpRequest({
			uri: 'http://apps.cbp.gov/bwt/rss.asp?portList=Mexican%20Border&f=html',
			method: 'GET',
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10
		}, function(error, resp, body) {
			// TODO non-happy path
			var xmlStatus = xmlParser.parseString(body, { trim: true, explicitArray: false }, function(err, res) {
				response.jsonp(res.rss);
			});
		});
	}
);

router.route('/test').get(
	function(request, response) {
		httpRequest({
			uri: 'http://apps.cbp.gov/bwt/rss.asp?portList=Mexican%20Border&f=html',
			method: 'GET',
			timeout: 10000,
			followRedirect: true,
			maxRedirects: 10
		}, function(error, resp, body) {
			// TODO non-happy path
			var xmlStatus = xmlParser.parseString(body, { trim: true, explicitArray: false }, function(err, res) {
				var n = 0,
					m = 0, 
					portFullName = '',
					portNameArray,
					responseObj = {},
					items = res.rss.channel.item;

				responseObj.northernCountry = "United States";
				responseObj.southernCountry = "Mexico";
				responseObj.updatedAt = res.rss.channel.pubDate;
				responseObj.crossingPoints = [];

				for (n = 0; n < items.length; n++) {
					portFullName = '' + items[n].title.trim()
					portNameArray = portFullName.split('-');

					responseObj.crossingPoints.push({
						city: portNameArray[0].trim(),
						crossingPoint: portNameArray[1].trim(),
						crossingPointId: items[n].link.split('port=')[1],
						rssLink: items[n].link,
						updatedAt: "TODO",
						commercialVehicles: {
							maxLanes: 0,
							standardLanes: {
								lanesOpen: 0,
								delay: 0
							},
							fastLanes: {
								lanesOpen: 0,
								delay: 0
							}
						},
						passengerVehicles: {
							maxLanes: 0,
							standardLanes: {
								lanesOpen: 0,
								delay: 0
							},
							readyLanes: {
								lanesOpen: 0,
								delay: 0
							},
							sentriLanes: {
								lanesOpen: 0,
								delay: 0
							}
						},
						pedestrians: {
							maxLanes: 0,
							standardLanes: {
								lanesOpen: 0,
								delay: 0
							},
							readyLanes: {
								lanesOpen: 0,
								delay: 0
							}
						},
						hours: items[n].description._
					});

					console.log(items[n].description);
					console.log('---------');
				}				


				response.jsonp(responseObj);
			});
		});
	}
);

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('Border Wait API Server listening on port ' + port);
