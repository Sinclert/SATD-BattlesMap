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

// Battle icons
var ambush = L.icon({
                iconUrl: './icons/ambush.png',
                iconSize:     [20, 20],
                shadowSize:   [0, 0], // size of the shadow
                iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
                shadowAnchor: [0, 0],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

var pitched = L.icon({
                iconUrl: './icons/pitched.png',
                iconSize:     [20, 20],
                shadowSize:   [0, 0], // size of the shadow
                iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
                shadowAnchor: [0, 0],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

var siege = L.icon({
                iconUrl: './icons/siege.png',
                iconSize:     [17, 20],
                shadowSize:   [0, 0], // size of the shadow
                iconAnchor:   [8.5, 10], // point of the icon which will correspond to marker's location
                shadowAnchor: [0, 0],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

var razing = L.icon({
                iconUrl: './icons/razing.png',
                iconSize:     [30, 30],
                shadowSize:   [0, 0], // size of the shadow
                iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
                shadowAnchor: [0, 0],  // the same for the shadow
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

function toggleLayerPanel(){
	const e=document.getElementById('layer-panel');
	e.classList.toggle('layer-panel-active')
}

/** On click action that shows battle information on the information panel
 * battle: battle object containing all information
*/
function showInfo(e) {
	var name = e.target.options.title;
    document.getElementById("header-t").innerHTML = name;
    var info = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].name === name) {
            info = data[i].note;
        }
    }
    document.getElementById("info-content").innerHTML =  "<p>" + info + "</p>";
}



/** On click action that shows battle information on the information panel
 * battle: battle object containing all information
*/
function showLegend() {
    document.getElementById("header-t").innerHTML = "Legend";
    document.getElementById("info-content").innerHTML =  "<img src = './icons/ambush.png' width=30 height=30>" + "is ambush battle" + "<br>"
    													+ "<img src = './icons/pitched.png' width=30 height=30>" + "is piched battle" + "<br>"
    													+ "<img src = './icons/siege.png' width=30 height=30>" + "is siege battle" + "<br>"
    													+ "<img src = './icons/razing.png' width=30 height=30>" + "is razing battle" + "<br>"
    													+ "<div class='box Lannister'></div>" + "is Lannister" + "<br><br>"
    													+ "<div class='box Stark'></div>" + "<p style='float:left; margin:0; padding-left:0'> is Stark</p>" + "<br><br>"
    													+ "<div class='box Greyjoy'></div>" + "<p style='float:left; margin:0; padding:0'> is Greyjoy</p>" + "<br><br>"
    													+ "<div class='box Bolton'></div>" + "<p style='float:left; margin:0; padding:0'> is Bolton</p>" + "<br><br>"
    													+ "<div class='box Baratheon'></div>" + "<p style='float:left; margin:0; padding:0'> is Baratheon</p>" + "<br><br>"
    													+ "<div class='box Darry'></div>" + "<p style='float:left; margin:0; padding:0'> is Darry</p>" + "<br><br>"
    													+ "<div class='box Brotherhood'></div>" + "<p style='float:left; margin:0; padding:0'> is Brotherhood</p>" + "<br><br>"
    													+ "<div class='box Frey'></div>" + "<p style='float:left; margin:0; padding:0'> is Frey</p>" + "<br><br>"
    													+ "<div class='box Free'></div>" + "<p style='float:left; margin:0; padding:0'> is Free</p>" + "<br><br>"
    													+ "<div class='box Brave'></div>" + "<p style='float:left; margin:0; padding:0'> is Brave</p>" + "<br><br>"
    													+ "<div class='box Bracken'></div>" + "<p style='float:left; margin:0; padding:0'> is Bracken</p>" + "<br><br>"
    													+ "<div class='box Karstark'></div>" + "<p style='float:left; margin:0; padding:0'> is Karstark</p>" + "<br><br>"
    													+ "<div class='box Tully'></div>" + "<p style='float:left; margin:0; padding:0'> is Tully</p>" + "<br><br>"
    													+ "<div class='box Mallister'></div>" + "<p style='float:left; margin:0; padding:0'> is Mallister</p>" + "<br><br>"
    													+ "<div class='box Night'></div>" + "<p style='float:left; margin:0; padding:0'> is Night</p>" + "<br><br>"
    													+ "<div class='box Tyrell'></div>" + "<p style='float:left; margin:0; padding:0'> is Tyrell</p>" + "<br><br>"
    													+ "<div class='box Blackwood'></div>" + "<p style='float:left; margin:0; padding:0'> is Blackwood</p>";
}


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


/** Clears the map from circles and popups */
function clearMap() {
    for(i in map._layers) {
        if(map._layers[i]._path != undefined || map._layers[i]._icon != undefined) {
            try {
                map.removeLayer(map._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + map._layers[i]);
            }
        }
    }
}


function lul() {
	var year = document.getElementById("slider").value;
	var regions = Array.from(document.getElementsByClassName("region-selector"));
	var regions2 = [];

	regions.forEach(function(element) {
		if (element.checked == true) {
			regions2.push(element.value);
		}
	});

	clearMap();

	var filteredArray = data.filter(function(object) {
		return (regions2.includes(object['region']) && object['year'] === year);
	})

	paintBattles(filteredArray);
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
function paintBattles(elemnts) {

	for (var i = 0; i < elemnts.length - 1; i++) {
        
		// Radius for circle asignation, multiplied by 10 so that it can be seen
		var radius = elemnts[i].attacker_size * 10;

		// Color assignation by house
		var color = null;
		if (elemnts[i].attacker_1 in colors) {
			color = colors[elemnts[i].attacker_1];
		} else {
			var aux = elemnts[i].attacker_1.split(' ');
			if (aux[0] in colors) {
				color = colors[aux[0]];
			}
		}
		if (elemnts[i].lat === "" || elemnts[i].lon === "") {
			continue;
		} else {
			// Attacker circle
			L.circle([elemnts[i].lat, elemnts[i].lng], 
						radius, 
						{
							fillColor: color,
							color: color,
							fillOpacity: 0.1,
							title: elemnts[i].name
						}
					).addTo(map).on("click", function(e) {
						showInfo(e);
			});

			if (elemnts[i].defender_1 in colors) {
				color = colors[elemnts[i].defender_1];
			} else {
				var aux2 = elemnts[i].defender_1.split(' ');
				if (aux2[0] in colors) {
					color = colors[aux2[0]];
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
					 	showInfo(e);
				        
			});
            
            if (elemnts[i].battle_type === "pitched battle") {
                L.marker([elemnts[i].lat, elemnts[i].lng], {icon: pitched, title: elemnts[i].name}).addTo(map).on("click", function(e) {
					 	showInfo(e);
				        
			     });
            } else if(elemnts[i].battle_type === "ambush") {
                L.marker([elemnts[i].lat, elemnts[i].lng], {icon: ambush, title: elemnts[i].name}).addTo(map).on("click", function(e) {
					 	showInfo(e);
				        
			     });
            } else if(elemnts[i].battle_type === "siege") {
                L.marker([elemnts[i].lat, elemnts[i].lng], {icon: siege, title: elemnts[i].name}).addTo(map).on("click", function(e) {
					 	showInfo(e);
				        
			});
            } else {
                L.marker([elemnts[i].lat, elemnts[i].lng], {icon: razing, title: elemnts[i].name}).addTo(map).on("click", function(e) {
					 	showInfo(e);
				        
			     });
            }
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

	map.on("click", function(e) {
		showLegend();
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
	lul();

	showLegend();
	
	// Add event listener to the info panel
	document.getElementById("info-title").addEventListener('click', show, false);
}




// Start painting the map
create();
