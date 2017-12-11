// Global variables
var fileData = null;
var data = [];
var colors = {
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




/** On click action that shows battle information on the information panel
 * battle: battle object containing all information
*/
/*function showInfo(battle) {
	console.log("clicked on circle");
	document.getElementById("header-t").innerHTML = battle["name"];
	document.getElementsByClassName("info-content").innerHTML = "<p>" + battle["note"] + "</p>";
}*/




/** Function that shows the info panel on-click */
function show() {
	document.getElementById("info-container").classList.toggle('info-active');
}




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




/** Function that paints all the battle data in the map */
function paintBattles() {

	for (var i = 0; i < data.length - 1; i++) {

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
		if (data[i].lat === "" || data[i].lon === "") {
			continue;
		} else {
			// Attacker circle
			L.circle([data[i].lat, data[i].lng], 
						radius, 
						{
							fillColor: color,
							color: color,
							fillOpacity: 0.1,
							title: data[i].name
						}
					).addTo(map).on("click", function(e) {
					console.log(e);

				//document.getElementById("header-t").innerHTML = battle["name"];
				//var ee = document.getElementsByClassName("info-content");
				//ee[0].innerHTML = "<p>" + battle["note"] + "</p>";
			});
					/*;

			map.on("click", function(e) {
				console.log(e);
			});

			/*.on("click", function (data[i]) {
						document.getElementById("header-t").innerHTML = battle["name"];
						var ee = document.getElementsByClassName("info-content");
						ee[0].innerHTML = "<p>" + battle["note"] + "</p>";
					 });*/

			if (data[i].defender_1 in colors) {
				color = colors[data[i].defender_1];
			} else {
				var aux2 = data[i].defender_1.split(' ');
				if (aux2[0] in colors) {
					color = colors[aux2[0]];
				}
			}
			
			radius = data[i].defender_size * 10;
			
			//Defender circle
			L.circle([data[i].lat, data[i].lng], radius, {
					 fillColor: color,
					 color: color,
					 fillOpacity: 0.1
					 }).addTo(map);//.on("click", showInfo(data[i]));
		}
	}
}




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
	
	// Add event listener to the info panel
	document.getElementById("info-title").addEventListener('click', show, false);
}




// Start painting the map
create();
