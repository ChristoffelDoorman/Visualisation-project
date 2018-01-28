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

    // calculate total immigrants or emigrants
    var totalMigration = 0;

    for (var i = 0; i < data.length; i++) {
        totalMigration += data[i]['value'];
    }

    // append svg
    if (migrationType == 'immigration') {

        addTooltip('#container3', 'pie');

        var piechart = d3.select('#container3').append('svg')
            .attr('class', 'piechart rem')
            .attr('height', 400)
            .attr('width', 400)
            .append('g')
            .attr('transform', 'translate(' + 200 + ',' + 200 + ')')
    }

    if (migrationType == 'emigration') {

        addTooltip('#container4', 'piechart');

        var piechart = d3.select('#container4').append('svg')
            .attr('class', 'piechart rem')
            .attr('height', 400)
            .attr('width', 400)
            .append('g')
            .attr('transform', 'translate(' + 200  + ',' + 200 + ')')
    }

    // display total emigration or emigration inside piechart
    piechart.append('text')
        .attr("text-anchor", "middle")
        .text("Total: " + totalMigration);

    var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(80);

    var pie = d3.layout.pie()
			.sort(null)
			.value(function(d){ return d.value; });

    // piechart.append('g')
    //         .attr('class', 'slices')
    //
    // var key = function(d){ return d.data.label; };
    //
    // var slice = svg.select(".slices").selectAll("path.slice")
	// 	.data(pie(data), key);

    var g = piechart.selectAll(".fan")
			.data(pie(data))
			.enter()
			.append("g")
			.attr("class", "fan")
            .on('mouseover', function(d) {

                // show tooltip
               tooltip = d3.select('#tooltip-' + 'pie');
               var mouse = d3.mouse(this);
               console.log(mouse[0],mouse[1]);
               tooltip.classed('hidden', false)
                   .attr('style', 'left:' + (mouse[0] + 100) +
                           'px; top:' + (mouse[1] + 100) + 'px')
                   .html(function() {

                       if (migrationType == 'immigration') {
                           if (d.data.country == 'Others') {
                               return '<strong>Total other countries:</strong> <span>' + d.data.value + '</span> <br/> <strong>'
                               'Countries:</strong> <span> \u0024' + d.data.info + '</span>';
                           }
                            return '<strong>Country:</strong> <span>' + d.data.name + '</span> <br/> <strong>' +
                            'Immigrants:</strong> <span> \u0024' + d.data.value + '</span>';
                        }
                        // tooltip for Happiness
                        return '<strong>Country:</strong> <span>' + d.data.name + '</span> <br/> <strong>'
                        'Emigrants:</strong> <span>' + d.data.value + '</span>';
                    })

            })

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
