//import L from 'leaflet'
//Global variables

var fileData = null;
var data = [];
var colors = {Lannister: "#cdd10a", Stark: "#9ddce8", Greyjoy: "#999d9e", Bolton: "#ce4021",
             Baratheon: "#6b3410", Darry: "#f25c10", Brotherhood: "#ffffff", Frey: "#327a2d",
             Free: "#c6cec7", Brave: "#84800b", Bracken: "#560505", Karstark: "#10a887",
             Tully: "#fcbfc8", Mallister: "#7c64a8", Night: "#000000", Tyrell: "#ffb7ef",
             Blackwood: "#ff9b9b"};

var map = null;

function create() {
    map = L.map('map').setView([5,20], 4);
    mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'https://cartocdn-ashbu.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        center: [ 5, 20 ],
        zoom: 4,
        maxZoom: 8,
        minZoom: 4,
        maxBounds: [ [ 50, -30 ], [ -45, 100 ] ]
        }).addTo(map);
        
    // Change the position of the zoom control
    map.zoomControl.setPosition('bottomright');
    // Set map boundaries
    map.setMaxBounds([[50,-30],[-45,100]]);
    
    // Get file data
    readTextFile("./5kings_battles_v1.csv");
    
    // Set objects data
    getBattles(fileData);
    
    // Show battles data on the map
    paintBattles();
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                fileData = allText;
            }
        }
    };
    rawFile.send(null);
}

function getBattles(text) {
    var lines = text.split('\n');
    for (var i = 1; i < (lines.length - 1); i++) {
        var elements = lines[i].split(';')
        var aux = {
            name:               elements[0],
            year:               elements[1],
            battle_number:      elements[2],
            attacker_king:      elements[3],
            defender_king:      elements[4],
            attacker_1:         elements[5],
            attacker_2:         elements[6],
            attacker_3:         elements[7],
            attacker_4:         elements[8],
            defender_1:         elements[9],
            defender_2:         elements[10],
            defender_3:         elements[11],
            defender_4:         elements[12],
            attacker_outcome:   elements[13],
            battle_type:        elements[14],
            major_death:        elements[15],
            major_capture:      elements[16],
            attacker_size:      elements[17],
            defender_size:      elements[18],
            attacker_commander: elements[19],
            defender_commander: elements[20],
            summer:             elements[21],
            location:           elements[22],
            lat:                elements[23],
            lng:                elements[24],
            region:             elements[25],
            note:               elements[26]
        };
        data.push(aux);
    }
}

function paintBattles() {
    console.log("in paint battles");
    
    for (var i = 0; i < data.length - 1; i++) {
    //data.forEach(function (key) {
        console.log(data[i]);
        // Radius for circle asignation, multiplied by 10 so that it can be seen
        var radius = data[i].attacker_size * 10;
        // Color assignation by house
        var color = null;
        if (data[i].attacker_1 in colors) {
            color = colors[data[i].attacker_1];
        } else {
            var aux = data[i].attacker_1.split(' ');
            if (aux[0] in colors) {
                color = colors[aux[0]];
            }
        }
        
        // Attacker circle
        L.circle([data[i].lat, data[i].lng], radius, {
                 fillColor: color,
                 color: color,
                 fillOpacity: 0.3
                 }).addTo(map);
        
        if (data[i].defender_1 in colors) {
            color = colors[data[i].defender_1];
        } else {
            var aux2 = data[i].defender_1.split(' ');
            if (aux2[0] in colors) {
                color = colors[aux2[0]];
            }
        }
        
        //Defender circle
        L.circle([data[i].lat, data[i].lng], radius, {
                 fillColor: color,
                 fillOpacity: 0.5
                 }).addTo(map);
    //});
    }
}