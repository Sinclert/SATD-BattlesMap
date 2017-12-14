/*	Authors:
	Sinclert Pérez (Sinclert@hotmail.com)
	Silvia Barbero (Silvia.br@protonmail.com)
	Pablo León Pacheco (pleonpacheco@protonmail.com)
*/


/* ------------------------------ GLOBAL VARIABLES ------------------------------ */
var fileData = null;
var data = [];
var houses = {
    Lannister: "#cdd10a",
	Stark: "#9ddce8",
	Greyjoy: "#999d9e",
	Bolton: "#ce4021",
	Baratheon: "#6b3410",
	Darry: "#f25c10",
	Brotherhood: "#ffffff",
	Frey: "#327a2d",
	Free: "#c6cec7",
	Brave: "#84800b",
	Bracken: "#560505",
	Karstark: "#10a887",
	Tully: "#fcbfc8",
	Mallister: "#7c64a8",
	Night: "#000000",
	Tyrell: "#ffb7ef",
	Blackwood: "#ff9b9b"
};

var map = null;



/* ------------------------------ BATTLES ICONS ------------------------------ */

// Icon to represent the ambush type of battle
var ambush = L.icon({
	iconUrl: './icons/ambush.png',
	iconSize:     [25, 25],
	shadowSize:   [0, 0],
	iconAnchor:   [12.5, 12.5],
	shadowAnchor: [0, 0],
	popupAnchor:  [-3, -76]
});


// Icon to represent the pitched type of battle
var pitched = L.icon({
	iconUrl: './icons/pitched.png',
	iconSize:     [25, 25],
	shadowSize:   [0, 0],
	iconAnchor:   [12.5, 12.5],
	shadowAnchor: [0, 0],
	popupAnchor:  [-3, -76]
});


// Icon to represent the siege type of battle
var siege = L.icon({
	iconUrl: './icons/siege.png',
	iconSize:     [20, 22],
	shadowSize:   [0, 0],
	iconAnchor:   [10, 11],
	shadowAnchor: [0, 0],
	popupAnchor:  [-3, -76]
});


// Icon to represent the razing type of battle
var razing = L.icon({
	iconUrl: './icons/razing.png',
	iconSize:     [30, 30],
	shadowSize:   [0, 0],
	iconAnchor:   [15, 15],
	shadowAnchor: [0, 0],
	popupAnchor:  [-3, -76]
});




/* ------------------------------ TOGGLE PANELS FUNCTIONS ------------------------------ */


/** Toggles the bottom information panel */
function showInfoPanel() {
	document.getElementById("info-container").classList.toggle('info-active');
}


/** Toggles the right layer panel */
function toggleLayerPanel() {
	document.getElementById('layer-panel').classList.toggle('layer-panel-active');
}



/* ------------------------- LOAD INFORMATION FUNCTIONS -------------------------- */


/** On click action that loads battle information on the information panel */
function loadBattleInfo(e) {

	var name = e.target.options.title;
    document.getElementById("header-t").innerHTML = name;

    var info = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].name === name) {
            info = data[i].note;
        }
    }

    document.getElementById("info-content").innerHTML =  "<p>" + info + "</p>";
    document.getElementById("info-container").classList.add('info-active');
}


/** On click action that shows battle information on the information panel */
function loadLegend() {
    document.getElementById("header-t").innerHTML = "Captions";
    document.getElementById("info-content").innerHTML =  "<img src = './icons/ambush.png' width=40 height=40>" + "is ambush" + "<br>"
    													+ "<img src = './icons/pitched.png' width=40 height=40>" + "is pitched battle" + "<br>"
    													+ "<img src = './icons/siege.png' width=40 height=40>" + "is siege" + "<br>"
    													+ "<img src = './icons/razing.png' width=40 height=40>" + "is razing" + "<br>"
    													+ "<br>"
    													+ "<div class='box Lannister'></div>" + "is Lannister" + "<br><br>"
    													+ "<div class='box Stark'></div>" + "<p style='float:left; margin:0; padding-left:0'> is Stark</p>" + "<br><br>"
    													+ "<div class='box Greyjoy'></div>" + "<p style='float:left; margin:0; padding:0'> is Greyjoy</p>" + "<br><br>"
    													+ "<div class='box Bolton'></div>" + "<p style='float:left; margin:0; padding:0'> is Bolton</p>" + "<br><br>"
    													+ "<div class='box Baratheon'></div>" + "<p style='float:left; margin:0; padding:0'> is Baratheon</p>" + "<br><br>"
    													+ "<div class='box Darry'></div>" + "<p style='float:left; margin:0; padding:0'> is Darry</p>" + "<br><br>"
    													+ "<div class='box Brotherhood'></div>" + "<p style='float:left; margin:0; padding:0'> is Brotherhood without Banners</p>" + "<br><br>"
    													+ "<div class='box Frey'></div>" + "<p style='float:left; margin:0; padding:0'> is Frey</p>" + "<br><br>"
    													+ "<div class='box Free'></div>" + "<p style='float:left; margin:0; padding:0'> is Free Folk</p>" + "<br><br>"
    													+ "<div class='box Brave'></div>" + "<p style='float:left; margin:0; padding:0'> is Brave Companions</p>" + "<br><br>"
    													+ "<div class='box Bracken'></div>" + "<p style='float:left; margin:0; padding:0'> is Bracken</p>" + "<br><br>"
    													+ "<div class='box Karstark'></div>" + "<p style='float:left; margin:0; padding:0'> is Karstark</p>" + "<br><br>"
    													+ "<div class='box Tully'></div>" + "<p style='float:left; margin:0; padding:0'> is Tully</p>" + "<br><br>"
    													+ "<div class='box Mallister'></div>" + "<p style='float:left; margin:0; padding:0'> is Mallister</p>" + "<br><br>"
    													+ "<div class='box Night'></div>" + "<p style='float:left; margin:0; padding:0'> is Night's Watch</p>" + "<br><br>"
    													+ "<div class='box Tyrell'></div>" + "<p style='float:left; margin:0; padding:0'> is Tyrell</p>" + "<br><br>"
    													+ "<div class='box Blackwood'></div>" + "<p style='float:left; margin:0; padding:0'> is Blackwood</p>";
}




/* ------------------------------ READ CSV FUNCTIONS ------------------------------ */


/** Reads a csv file and stores the complete file on the global variable fileData
 * file: string containing the relative path to the local file
*/
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


/** File that stores all battle info in the global variable data from a text
 * text: string variable containing battle information
*/
function getBattles(text) {

	var lines = text.split('\n');

	for (var i = 1; i < (lines.length - 1); i++) {
		var elements = lines[i].split(';')
		var aux = {
			name:               elements[0],
			year:               elements[1],
			attacker_1:         elements[5],
			defender_1:         elements[9],
			battle_type:        elements[14],
			attacker_size:      elements[17],
			defender_size:      elements[18],
			lat:                elements[23],
			lng:                elements[24],
			region:             elements[25],
			note:               elements[26]
		};
		data.push(aux);
	}
}




/* ------------------------------ TOGGLE PANELS FUNCTIONS ------------------------------ */

/** Clears the map from circles and popups */
function clearMap() {

    for (i in map._layers) {

        if (map._layers[i]._path != undefined || map._layers[i]._icon != undefined) {
            try {
                map.removeLayer(map._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + map._layers[i]);
            }
        }
    }
}


/** Filters data by user selections and paints the result on the map */
function filterData() {
	var year = document.getElementById("slider").value;
	var regions = Array.from(document.getElementsByClassName("region-selector"));
    var battles = Array.from(document.getElementsByClassName("battle-selector"));
	var regions2 = [];
    var battles2 = [];

	regions.forEach(function(element) {
		if (element.checked == true) {
			regions2.push(element.value);
		}
	});

    battles.forEach(function(element) {
        if (element.checked == true) {
            battles2.push(element.value);
        }
    });

	clearMap();

	var filteredArray = data.filter(function(object) {
		return (regions2.includes(object['region']) && object['year'] === year && battles2.includes(object['battle_type']));
	})

	paintBattles(filteredArray);
}




/* -------------------------------- PAINT ELEMENTS -------------------------------- */


/** Function that paints all the battle data in the map */
function paintBattles(elemnts) {

	for (var i = 0; i < elemnts.length - 1; i++) {

		if (elemnts[i].lat === "" || elemnts[i].lon === "") {
			continue;
		}

		// Radius for circle asignation, multiplied by 10 so that it can be seen
		var radius = elemnts[i].attacker_size * 10;

		// Color assignation by house
		var color = null;
		if (elemnts[i].attacker_1 in houses) {
			color = houses[elemnts[i].attacker_1];
		}
		else {
			var aux = elemnts[i].attacker_1.split(' ');
			if (aux[0] in houses) {
				color = houses[aux[0]];
			}
		}

		// Attacker circle
		L.circle(
			[elemnts[i].lat, elemnts[i].lng],
			radius,
			{
				fillColor: color,
				color: color,
				fillOpacity: 0.1,
				title: elemnts[i].name
			}
			).addTo(map).on("click", function(e) {
				loadBattleInfo(e);
		});



		if (elemnts[i].defender_1 in houses) {
			color = houses[elemnts[i].defender_1];
		}
		else {
			var aux2 = elemnts[i].defender_1.split(' ');
			if (aux2[0] in houses) {
				color = houses[aux2[0]];
			}
		}

		radius = elemnts[i].defender_size * 10;

		//Defender circle
		L.circle([elemnts[i].lat, elemnts[i].lng], radius, {
				 fillColor: color,
				 color: color,
				 fillOpacity: 0.1,
                 title: elemnts[i].name
				 }).addTo(map).on("click", function(e) {
				 	loadBattleInfo(e);

		});

        if (elemnts[i].battle_type === "pitched battle") {
            L.marker([elemnts[i].lat, elemnts[i].lng], {icon: pitched, title: elemnts[i].name}).addTo(map).on("click", function(e) {
				 	loadBattleInfo(e);

		     });
        } else if(elemnts[i].battle_type === "ambush") {
            L.marker([elemnts[i].lat, elemnts[i].lng], {icon: ambush, title: elemnts[i].name}).addTo(map).on("click", function(e) {
				 	loadBattleInfo(e);

		     });
        } else if(elemnts[i].battle_type === "siege") {
            L.marker([elemnts[i].lat, elemnts[i].lng], {icon: siege, title: elemnts[i].name}).addTo(map).on("click", function(e) {
				 	loadBattleInfo(e);

		});
        } else {
            L.marker([elemnts[i].lat, elemnts[i].lng], {icon: razing, title: elemnts[i].name}).addTo(map).on("click", function(e) {
				 	loadBattleInfo(e);

		     });
        }
	}
}


/* -------------------------------- MAP CREATION -------------------------------- */

/** Initializes the map data and calls the functions to paint the data in the map */
function create() {

	map = L.map('map').setView([5,20], 4);
	mapLink =
			'<a href="http://openstreetmap.org">OpenStreetMap</a>';
	L.tileLayer('https://cartocdn-ashbu.global.ssl.fastly.net/ramirocartodb/api/v1/map/named/tpl_756aec63_3adb_48b6_9d14_331c6cbc47cf/all/{z}/{x}/{y}.png', {
		attribution: '&copy; ' + mapLink + ' Contributors',
		center: [ 5, 20 ],
		zoom: 4,
		maxZoom: 8,
		minZoom: 4,
		maxBounds: [ [ 50, -30 ], [ -45, 100 ] ]
	}).addTo(map);

	map.on("click", function(e) {
		var a = document.getElementById("header-t");

		if (a.innerHTML == "Captions") {
			document.getElementById("info-container").classList.remove('info-active');
		}
		else {
			loadLegend();
		}
	});

	// Change the position of the zoom control
	map.zoomControl.setPosition('bottomright');

	// Set map boundaries
	map.setMaxBounds([[50,-30],[-45,100]]);

	// Get file data
	readTextFile("./5kings_battles_v1.csv");

	// Set objects data
	getBattles(fileData);

	// Show battles data on the map
	fileData();
	loadLegend();

	// Add event listener to the info panel
	document.getElementById("info-title").addEventListener('click', showInfoPanel, false);
}


// Start painting the map
create();
