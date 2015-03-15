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
		var parsedData = {},
			laneData = parseLaneData(rawData);

		parsedData = {
			hours: parseOpeningHours(getValueByLabel('Hours', rawData)),
			commercialVehicles: laneData.commercialVehicles,
			passengerVehicles: laneData.passengerVehicles,
			pedestrians: laneData.pedestrians,
			notice: getValueByLabel('Notice', rawData)
		}

		return parsedData;
	},

	getLatLong: function(crossingPortId) {
		var latLong = {};

		latLong.latitude = 0.0;
		latLong.longitude = 0.0;

		return latLong;
	}
};

var getValueByLabel = function(label, rawData) {
	var val = '';
	var i = 0;

	if (label === 'Hours') {
		i = rawData.indexOf('Date:');
		val = rawData.substring(6, i).trim();
	} else if (label === 'Date') {
		// TODO
	} else if (label === 'Notice') {
		i = rawData.indexOf('Border Notice:');
		if (i > 0) {
			val = rawData.substring(i + 14).trim();
		}
	}

	return val;
};

var convertHourTo24Hour = function(hourText) {
	var hourValue = 0;

	if (hourText != 'Midnight') {
		// Cope with minutes past the hour? Right now everything
		// opens or closes on the hour
		if (hourText.indexOf(' pm') != -1) {
			hourValue = parseInt(hourText.replace(' pm', '').trim()) + 12;
		} else {
			hourValue = parseInt(hourText.replace(' am', '').trim());
		}
	}

	return hourValue;
}

var parseOpeningHours = function(hours) {
	var openingHours = {},
		hoursComponents = '';

	if (hours === '24 hrs/day') {
		openingHours.opensAt = 24;
		openingHours.closesAt = 24;
		openingHours.isOpen = true;
	} else {
		hoursComponents = hours.split('-');
		openingHours.opensAt = convertHourTo24Hour(hoursComponents[0]);
		openingHours.closesAt = convertHourTo24Hour(hoursComponents[1]);
		openingHours.isOpen = false; // TODO
	}

	return openingHours;
};

var parseLaneString = function(laneString) {
	var laneData = {
		numLanes: 0,
		delay: 0
	};

	if (! (laneString === 'N/A' || laneString === 'Lanes Closed' || laneString === 'Lane Closed')) {
		// Some number of langes maybe with some delay
	}

	return laneData;
};

var parseNumber = function(str) {
	if (str === 'N/A') {
		return 0;
	} else {
		return parseInt(str);
	}
}

var parseLaneData = function(rawData) {
	var laneData = {};

	// Maximum Lanes:
	// Standard Lanes:
	// Fast Lanes:

	dataElements = rawData.split('Maximum Lanes: ');

	laneData.commercialVehicles = {
		rawData: dataElements[1],
		maxLanes: parseNumber(dataElements[1].split(' ')[0].trim()),
		standardLanes: {
			lanesOpen: 0,
			delay: 0
		},
		fastLanes: {
			lanesOpen: 0,
			delay: 0
		}
	};

	// Maximum Lanes:
	// Standard Lanes:
	// Readylane:
	// Sentri Lanes:

	laneData.passengerVehicles = {
		rawData: dataElements[2],
		maxLanes: parseNumber(dataElements[2].split(' ')[0].trim()),
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
	};

	// Maximum Lanes:
	// Standard Lanes:
	// Readylane:

	laneData.pedestrians = {
		rawData: dataElements[3],
		maxLanes: parseNumber(dataElements[3].split(' ')[0].trim()),
		standardLanes: {
			lanesOpen: 0,
			delay: 0
		},
		readyLanes: {
			lanesOpen: 0,
			delay: 0
		}				
	};

	return laneData;
}