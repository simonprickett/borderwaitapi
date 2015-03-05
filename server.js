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
					portName = '',
					items = res.rss.channel.item;

				for (n = 0; n < items.length; n++) {
					portName = '' + items[n].title.trim()
					//if (portName.endsWith(' -')) {
					//	console.log('**');
					// 	portName = portName.replace(' -', '');
					//}
					// Split at - use city and port of entry as some 
					// have multiple places
					console.log('"' + portName + '"');
				}				
				var respJSON = {
					"test": "value"
				}
				response.jsonp(respJSON);
				//response.jsonp(res.rss.channel.item);
			});
		});
	}
);

app.use(cors());
app.use('/api', router);
app.listen(port);
console.log('Border Wait API Server listening on port ' + port);
