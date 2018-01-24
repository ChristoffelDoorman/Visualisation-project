/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file contains two functions: a function that builds and updates the
worldmap, and a function that builds the legend.
*/

// var width = 960;
// var height = 400;
var radius = 200;

/*
This function draws a piechart.
data: the data from migrationData.json
year: the selected year (2010 or 2015)
country: the selected country in the worldmap
migrationType: emigration or immigration
*/
function drawPiechart(data, year, country, migrationType){

    // prepare data
    var data = data[year][country][migrationType]
    data.forEach(function(d) {
        d.value = +d.value;
    })

    // append svg
    if (migrationType == 'immigration') {
        var piechart = d3.select('#container3').append('svg')
            .attr('class', 'piechart rem')
            .attr('height', 400)
            .attr('width', 800)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    }

    if (migrationType == 'emigration') {
        var piechart = d3.select('#container4').append('svg')
            .attr('class', 'piechart rem')
            .attr('height', 400)
            .attr('width', 800)
            .append('g')
            .attr('transform', 'translate(' + width + ',' + height / 2 + ')')
    }

    var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(30);

    var pie = d3.layout.pie()
			.sort(null)
			.value(function(d){ return d.value; });

    var g = piechart.selectAll(".fan")
			.data(pie(data))
			.enter()
			.append("g")
			.attr("class", "fan")

    var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    g.append("path")
    	.attr("d", arc)
    	.attr("fill", function(d){ return color(d.data.country); })

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.country; });
}
