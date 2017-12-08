//Global variables

var fileData = null;
var data = [];
var colors = {Lannister: "#cdd10a", Stark: "#9ddce8", Greyjoy: "#999d9e", Bolton: "#ce4021", 
             Baratheon: "#6b3410", Darry: "#f25c10", Brotherhood: "#ffffff", Frey: "#327a2d",
             Free: "#c6cec7", Brave: "#84800b", Bracken: "#560505", Karstark: "#10a887",
             Tully: "#fcbfc8", Mallister: "#7c64a8", Night: "#000000", Tyrell: "#ffb7ef",
             Blackwood: "#ff9b9b"};


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
            defender_2:         elements[12],
            defender_3:         elements[13],
            defender_4:         elements[14],
            attacker_outcome:   elements[15],
            battle_type:        elements[16],
            major_death:        elements[17],
            major_capture:      elements[18],
            attacker_size:      elements[19],
            defender_size:      elements[20],
            attacker_commander: elements[21],
            defender_commander: elements[22],
            summer:             elements[23],
            location:           elements[24],
            lat:                elements[25],
            lng:                elements[26],
            region:             elements[27],
            note:               elements[28]
        };
        data.push(aux);
    }
}

function paintBattles() {
    console.log("in paint battles");
    data.forEach(function (key) {
        console.log(key);
        // Radius for circle asignation, multiplied by 10 so that it can be seen
        var radius = key.attacker_size * 10;
        // Color assignation by house
        var color = null;
        if (key.attacker_1 in colors) {
            color = colors[key];
        } else {
            var aux = key.attacker_1.split(' ');
            if (aux[1] in colors) {
                color = colors[key];
            }
        }
        
        // Attacker circle
        L.circle([key.lat, key.lng], radius, {
                 fillColor: color,
                 fillOpacity: 0.5
                 }).addTo(map);
        
        if (key.defender_1 in colors) {
            color = colors[key];
        } else {
            var aux2 = key.defender_1.split(' ');
            if (aux2[1] in colors) {
                color = colors[key];
            }
        }
        
        //Defender circle
        L.circle([key.lat, key.lng], radius, {
                 fillColor: color,
                 fillOpacity: 0.5
                 }).addTo(map);
    });
}