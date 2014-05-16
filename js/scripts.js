/**
 * @author Harry Stevens
 */

//Global variables
var map;
var layer_0;

//This function is called when map stuff is loaded
function initializeMap() {

	//For case where map is mobile. Taken straight from Google Fusion tables publish tab.
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) || (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}

	//Styles the div map-canvas where the map will display
	var mapDiv = document.getElementById('map-canvas');
	mapDiv.style.width = isMobile ? '100%' : '500px';
	mapDiv.style.height = isMobile ? '100%' : '500px';

	//Updates global var map with info about the div style and additional options for zoom and lat long center
	map = new google.maps.Map(mapDiv, {
		center : new google.maps.LatLng(22.752969426361606, 82.80077099999994),
		zoom : 4,
		streetViewControl : false,
		panControl : false,
		mapTypeControl: false
	});

	//Styles map to reduce saturation and remove unnecessary elements
	var style = [{
		featureType : 'landscape',
		elementType : 'all',
		stylers : [{
			saturation : -90
		}]
	},{
		featureType : 'landscape.natural',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	},	
	{
		featureType : 'water',
		elementType : 'all',
		stylers : [{
			saturation : -30
		}]
	},
	     {
          featureType: 'road.highway',
          elementType: 'all',
          stylers: [
            { visibility: 'off' }
          ]
        },
	 {
		featureType : 'road.arterial',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'road.local',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'administrative.neighborhood',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'administrative.land_parcel',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}, {
		featureType : 'poi',
		elementType : 'all',
		stylers : [{
			visibility : 'off'
		}]
	}];
	var styledMapType = new google.maps.StyledMapType(style, {
		map : map,
		name : 'Styled Map'
	});
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');

	//Creates functionality for updating map based on user inputs. The var whereClause will update the query string to pull certain data from the Fusion Tables
	layer_0 = new google.maps.FusionTablesLayer({
		query : {
			select : "col10\x3e\x3e1",
			from : "1Vt-yqPOyocRaA14roSMHOyQE9bfZ4kbaRxrbDDNc",
			where: ""
		},
		map : map,
		styleId : 2,
		templateId : 2
	});
	console.log(layer_0);
}

//Updates map based on state selection
function changeMap_state() {
	var whereClause;
	var searchString = $("#search-string_state").val();
	if (searchString != '--Select--') {
		whereClause = "'State' = '" + searchString + "'";
	}
	layer_0.setOptions({
		query : {
			select : "col10\x3e\x3e1",
			from : "1Vt-yqPOyocRaA14roSMHOyQE9bfZ4kbaRxrbDDNc",
			where : whereClause
		},
	});
}

//This is similar to document ready (though not identical) and does not use jQuery
google.maps.event.addDomListener(window, 'load', initializeMap);
