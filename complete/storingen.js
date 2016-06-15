// Chris Olberts

d3.select("body")
	.append("div")
		.attr("id", "dropdown")
	.append("select")
		.attr("id", "drop1");

function dataLoad(data) {
	
	for (i = 0, n = data.length; i < n; i++) {
		d3.select("select")
			.append("option")
				.attr("value", data[i].traject)
				.text(data[i].traject);
	};
}

d3.json("conversion.json", function(JSONdata) {
	data = JSONdata;
	dataLoad(data);
});
