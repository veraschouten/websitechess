var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
}),
    mapboxSatellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {   //Hier hoef je geen VAR voor te zetten, 
        maxZoom: 18,                                                                                                        //JavaScript snapt dat dit twee verschillende variabelen zijn
        id: 'mapbox/satellite-v9',
        accessToken: 'pk.eyJ1Ijoiam9yYW52ZHVpbiIsImEiOiJjam53d2k5a3EwZzdhM3FucTByaDRrMzQwIn0.sCAmQZysagzU2t82TJiRkw'        //<--- Vul hier svp eigen Mapbox Token toe :)
});


var map = L.map('mapid', {              //<--- Hier declareer je de kaart en het DIV-ID(HTML) waar de kaart naar moet refereren
    center: [43.3420431, -31.2019296],    //<--- Hier geef je het centrum van de kaart aan
    zoom: 2,                            //<--- Hier geef je het zoomniveau aan van je kaart (waar je begint)
    layers: [Stamen_Toner]              //<--- Hier declareer je de basemap (welke leaflet als eerste moet laten zien) <--- Verander eens naar mapboxSatellite
});

map.touchZoom.disable(); // <--- Dit schakelt het zoomen met vingers uit op de kaart
map.scrollWheelZoom.disable(); // <--- Dit schakelt het zoomen met je scrollwheel in

var baseMaps = {                    // Hier declareer je groep voor je basemaps. Er kunnen er meerdere staam
    "Wereldkaart": Stamen_Toner,    // Dit is de eerste basemap 
    "Mapbox": mapboxSatellite       // Dit is de tweede basemap
};

// Layers <-- Hier voeg je lagen toe aan Leaflet

var geoJSON = L.geoJson(filmlocaties, {   
    style: function (feature) {        // Hier geef je aan wat de functie, de feature, voor uiterlijk moet krijgen
        return {                       // Hier geef je aan wat er teruggegeven moet worden door de javascript 
            fillColor: '#43429C',       
            weight: 0.5,
            fillOpacity: 0.5
        }
    }
}).addTo(map);




L.control.layers(baseMaps, toggleLaag).addTo(map); // <-- Dit regelt de controls op je kaart, hier voor je (als je meerdere basemaps hebt) de basemaps toe
                                                    // maar als je er één hebt hoeft dat niet. Als je meerdere lagen weer wilt geven
                                                    // voeg je hier de toggleLaag toe.