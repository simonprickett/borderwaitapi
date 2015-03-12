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

var parseLaneData = function(rawData) {
	var laneData = {};

	laneData.commercialVehicles = {
		maxLanes: 0,
		standardLanes: {
			lanesOpen: 0,
			delay: 0
		},
		fastLanes: {
			lanesOpen: 0,
			delay: 0
		}
	};

	laneData.passengerVehicles = {
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
	};

	laneData.pedestrians = {
		maxLanes: 0,
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