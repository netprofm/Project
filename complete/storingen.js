// Chris Olberts

startDatum = "2011-02-25"
eindDatum = "2015-12-31"
currentTraject = ""
storingenGemiddeldTotaal = ""

$(function() {
		$('input[name="daterange"]').daterangepicker(
		{
			locale: {
			  format: 'YYYY-MM-DD'
			},
			startDate: startDatum,
			endDate: eindDatum,
			minDate: startDatum,
			maxDate: eindDatum
		}, 
		function(start, eind) {
			startDatum = start.format('YYYY-MM-DD')
			eindDatum = eind.format('YYYY-MM-DD')
			datumUpdate()
		});
		
});


d3.select("body")
	.append("div")
		.attr("id", "dropdown")

		
function dagenVerschil() {
		eenDag = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		aantalDagen = Math.round(Math.abs(((new Date(startDatum)).getTime() - (new Date(eindDatum)).getTime())/(eenDag)));
};

function dataLoad(lijnendata) {
	for (i = 0, n = lijnendata.length; i < n; i++) {
		d3.select("select")
			.append("option")
				.attr("value", lijnendata[i].traject)
				.text(lijnendata[i].traject);
	};
	trajectUpdate(lijnendata[0].traject);
	dagenVerschil();
	barchartUpdate();

};

d3.csv("storingen.csv", function(CSVdata) {
	storingendata = CSVdata;
	datumUpdate();
});

d3.json("conversion.json", function(JSONdata) {
	lijnendata = JSONdata;
	dataLoad(lijnendata);
});

d3.csv("vertraagd.csv", function(CSVdata) {
	vertragingsdata = CSVdata;
	drawDelayGraph(vertragingsdata);
});

function drawDelayGraph(vertragingsdata) {
	
	// initialize margins
	var margin = {top: 20, right: 60, bottom: 80, left: 60},
		padding = {top: 5, right: 1, bottom: 0, left: 1},
		fullWidth = 1500,
		fullHeight = 600,
		width = fullWidth - margin.left - margin.right,
		height = fullHeight - margin.top - margin.bottom;

	// set the scales
	var x = d3.time.scale()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0])
		
	// make the entire chart element
	var delayChart = d3.select("#linechart")
						.append("svg")
							.attr("class", "delayChart")
							.attr("width", fullWidth)
							.attr("height", fullHeight);
	
	/////////////////////// hier verder chris
}


currentLijnen = [];


function datumUpdate() {
	
	//search for lowerbound id
	for (i = 0, n = storingendata.length - 1; i < n; i++) {
		if ( storingendata[i].Start.indexOf(startDatum) > -1 ) 	{
			startIndex = i;
			break;
		}
		else {
			startIndex = 0;
		}
	}
	
	//search for upperbound id
	for (i = storingendata.length - 1, n = 0; i > n; i--) {
		if ( storingendata[i].Einde.indexOf(eindDatum) > -1 ) 	{
			eindIndex = i;
			break;
		}
		else {
			eindIndex = storingendata.length - 1;
		}
	}
	console.log(startIndex);
	console.log(eindIndex);	
	if (currentTraject) {
		storingenUpdate(currentTraject);
	}
}

function trajectUpdate(input) {
	currentTraject = input;
	storingenUpdate(input);
	
	for (i = 0, n = lijnendata.length; i < n; i++) {
		if (input == lijnendata[i].traject) {
			for (k = 0, l = currentLijnen.length; k < l; k++) {
				d3.select("#"+ currentLijnen[k])
					.attr("stroke", "#000000")
					.attr("stroke-width", "1");	
			}
			currentLijnen = [];
			for (j = 0, m = lijnendata[i].lijnen.length; j < m; j++) {
				currentLijnen.push(lijnendata[i].lijnen[j]);
				d3.select("#"+ lijnendata[i].lijnen[j])
					.attr("stroke", "#FF0000")
					.attr("stroke-width", "3");					
			}
			console.log(currentLijnen);
		}
	};
}

function storingenUpdate(traject) {
	storingenTraject = 0
	for (i = startIndex, n = eindIndex; i < n; i++) {
		if ( storingendata[i].Traject.indexOf(traject) > -1 ) {
			storingenTraject++
		}
	}
	dagenVerschil();
	storingenTraject = storingenTraject / aantalDagen;
	storingenTotaal = (eindIndex - startIndex) / aantalDagen;
	storingenGemiddeld = (storingenTotaal / lijnendata.length);
	
	barchartUpdate()
};

var barchartWidth = 640,
	barHeight = 20;

function barchartUpdate() {
	data = []
	if (storingenGemiddeldTotaal == "") {
		console.log("henk")
		storingenGemiddeldTotaal = storingenGemiddeld;
	}
	data.push(storingenTraject , storingenGemiddeld , storingenGemiddeldTotaal)
	console.log(data)
	d3.select(".barchartArea").remove();
	d3.select("#barchart")
		.attr("width", barchartWidth)
		.append("svg")
			.attr("class", "barchartArea")
		
	var x = d3.scale.linear()
		.domain([0, 0.4])
		.range([0, barchartWidth]);

	var chart = d3.select(".barchartArea")
		.attr("width", barchartWidth)
		.attr("height", barHeight * (data.length + 1));

	var bar = chart.selectAll("g")
		.data(data)
	  .enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
	
	bar.append("rect")
		.attr("width", x)
		.attr("height", barHeight - 1);

	bar.append("text")
				.attr("x", function(d) { return x(d) - 3; })
				.attr("y", barHeight / 2)
				.attr("dy", ".35em")
				.text(function(d, i) { if ( i == 0 ) { return "Total: " + d } 
									   if ( i == 1) { return "Henk: " + d }
									   if ( i == 2) { return "Bonk: " + d }
				});
				
	};
	






