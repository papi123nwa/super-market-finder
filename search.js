function init() {

    var map = L.map('map', {
		center: [60.2266667, 24.7666667],
		zoom: 13,
		minZoom: 10
	});

    var Hydda_Full = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var osmGeocoder = new L.Control.OSMGeocoder({
        collapsed: false,
        position: 'topright',
        text: 'Find me !',
    });
    map.addControl(osmGeocoder);
	
	map.addControl(L.control.locate({
    locateOptions: {
        zoom: 14
    }

    }));
 
 //Icons
 
    var marker_s = L.AwesomeMarkers.icon({
		icon: 'shopping-cart',
		prefix: 'fa',
		markerColor: 'green', 
		iconColor: 'black',
		iconSize: [38, 38]});

    var marker_k = L.AwesomeMarkers.icon({
		icon: 'shopping-cart',
		prefix: 'fa',
		markerColor: 'orange', 
		iconColor: 'black'});

    var marker_l = L.AwesomeMarkers.icon({
		icon: 'shopping-cart',
		prefix: 'fa',
		markerColor: 'blue', 
		iconColor: 'black',
		iconSize: [38, 38]});
  

    var smarket_layer = L.geoJson(smarket, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: marker_s
            }).bindPopup(feature.properties.name);
        }
    }).addTo(map);
    var kmarket_layer = L.geoJson(kmarket, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: marker_k
            }).bindPopup(feature.properties.name);
        }
    }).addTo(map);
    var lidl_layer = L.geoJson(lidl, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: marker_l
            }).bindPopup(feature.properties.name);
        }
    }).addTo(map);


//Add 500 m buffers
	
    var lmarket_layerrad50 = L.geoJson(lidl, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, 500, {
                fillColor: "#0000FF",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            })
        }
    })/*.addTo(map)*/;

    var smarket_layerrad50 = L.geoJson(smarket, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, 500, {
                fillColor: "#008000",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            })
        }
    })/*.addTo(map)*/;

    var kmarket_layerrad50 = L.geoJson(kmarket, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, 500, {
                fillColor: "#FFFF00",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.5
            })
        }
    })/*.addTo(map)*/;

//Add 1 km buffers
	
    var lmarket_layerrad = L.geoJson(lidl, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, 1000, {
                fillColor: "#0000FF",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.3
            })
        }
    })/*.addTo(map)*/;


    var smarket_layerrad = L.geoJson(smarket, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, 1000, {
                fillColor: "#008000",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.3
            })
        }
    })/*.addTo(map)*/;


    var kmarket_layerrad = L.geoJson(kmarket, {
        pointToLayer: function(feature, latlng) {
            return L.circle(latlng, 1000, {
                fillColor: "#FFFF00",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.3
            })
        }
    })/*.addTo(map)*/;

	
	//Layer control

    var baselayers = {
        "Hydra Full": Hydda_Full
    };

    var overlays = {
        "S-markets": smarket_layer,
        "K-markets": kmarket_layer,
        "Lidl": lidl_layer,
        "K-market 500 meter radius": kmarket_layerrad50,
        "S-market 500 meter radius": smarket_layerrad50,
        "Lidl 500 meter radius": lmarket_layerrad50,
        "K-market 1 km radius": kmarket_layerrad,
        "S-market 1 km radius": smarket_layerrad,
        "Lidl 1 km radius": lmarket_layerrad 
    };

    L.control.layers(baselayers, overlays , null,{
        collapsed: true
    }).addTo(map);

	
	// Scale bar
	L.control.scale({
		updateWhenIdle: true,
		maxWidth: 500
	});
	L.control.scale().addTo(map);
	
	// Legend
	function getColour(d) {
    switch (d) {
        case 'K-market within 500 m': return "#FFFF00";
        case 'S-market within 500 m': return "#008000";
        case 'Lidl within 500 m': return "#0000FF";
		case 'K-market within  1 km': return "#FFFACD";
        case 'S-market within 1 km': return "#3CB371";
        case 'Lidl within 1 km': return "#6495ED";
        default: return '#fff';
    }
	};
	
	var legend = L.control({position: 'bottomleft'});

	legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
        faultstatus = ['K-market within 500 m', 'K-market within  1 km', 'S-market within 500 m', 'S-market within 1 km', 'Lidl within 500 m', 'Lidl within 1 km'];

    // loop through the status values and generate a label with a coloured square for each value
    for (var i = 0; i < faultstatus.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColour(faultstatus[i]) + '"></i> ' + (faultstatus[i] ? faultstatus[i] + '<br>' : '+');
    }
    return div;
	};
	
	legend.addTo(map);


}
