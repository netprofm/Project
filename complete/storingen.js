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
	.append("select")
		.attr("id", "drop1");
		
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
	storingenGemiddeldTotaal = storingenGemiddeld
};

d3.csv("storingen.csv", function(CSVdata) {
	storingendata = CSVdata;
	datumUpdate();
});

d3.json("conversion.json", function(JSONdata) {
	lijnendata = JSONdata;
	dataLoad(lijnendata);
});



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
	console.log(storingenTraject);
	console.log(storingenGemiddeld);
	console.log(storingenGemiddeldTotaal);
};

var barchartwidth = 640,
	barchartHeight = 20;

function barchartUpdate() {
	d3.select(".barchartArea").remove();
	d3.select("#barchart")
		.append("g")
			.attr("class", "chartArea")
	
		
}





