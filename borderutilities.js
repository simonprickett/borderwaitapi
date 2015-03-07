// borderutilities.js
module.exports = {
	// Hours
	// Date
	// Maximum Lanes
	// Standard Lanes
	// Fast Lanes
	// Readylane
	// Sentri Lanes
	// Border Notice

	parseRawData: function(rawData) {
		var parsedData = {};

		parsedData = {
			hours: getValueByLabel("Hours", rawData),
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
			notice: getValueByLabel("Notice", rawData)
		}

		return parsedData;
	}
};

var getValueByLabel = function(label, rawData) {
	return "TODO";
}