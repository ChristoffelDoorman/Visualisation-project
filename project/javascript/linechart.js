
function drawLinechartFrame() {


}


function drawLinechart(data, country) {

    var parseDate = d3.time.format("%Y").parse;

    var dataset = []

    // prepare data
    for(var i = 0; i < years.length; i++) {
        if (data[years[i]]['gdp'][country] == 'unknown') {
            gdpValue = null;
        }
        else {
            gdpValue = +data[years[i]]['gdp'][country]
        }

        if (data[years[i]]['happiness'][country] == 'unknown') {
            happinessValue = null
        }
        else {
            happinessValue = +data[years[i]]['happiness'][country]
        }

        yearValue = parseDate(years[i]);
        dataset.push({'date': yearValue, 'gdp': gdpValue, 'happiness': happinessValue})
    }

    var x = d3.time.scale().range([0, width]);
    var y0 = d3.scale.linear().range([height, 0]);
    var y1 = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(9)
        // .ticks(d3.timeYear);

    var yAxisLeft = d3.svg.axis().scale(y0)
        .orient("left").ticks(5);

    var yAxisRight = d3.svg.axis().scale(y1)
        .orient("right").ticks(5);

    var gdpLine = d3.svg.line()
        .defined(function(d) { return d.gdp })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y0(d.gdp); });

    var happinessLine = d3.svg.line()
        .defined(function(d) { return d.happiness })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y1(d.happiness); })

    // create svg
    var linechart = d3.select('#container2')
        .append('svg')
            .attr('class', 'linechart rem')
            .attr('width', 600)
            .attr('height', 400)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    // add title
    linechart.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("GDP and happiness " + country);

    // scale the range of the data
    x.domain(d3.extent(dataset, function(d) { return d.date; }));
    y0.domain([0, d3.max(dataset, function(d) {
    	return Math.max(d.gdp) + 5000; })]);
    y1.domain([0, 10]);

    // add the line paths
    linechart.append('g')
        .attr('class', 'gdp')
        .append("path")
        .attr("class", "line")
        .attr("d", gdpLine(dataset))

    linechart.append('g')
        .attr('class', 'happiness')
        .append("path")
        .attr("class", "line")
        .attr("d", happinessLine(dataset))



    // // add the missing data paths
    // linechart.select('.gdp')
    //     .append("path")
    //     .attr('class', 'gap-line')
    //     .attr('d', gdpLine(dataset.filter()));
    //
    // console.log(dataset.filter())
    // // console.log(happinessLine.defined(function(d) { return d.happiness; }))
    //
    // linechart.select('.happiness')
    //     .append("path")
    //     .attr('class', 'gap-line')
    //     .attr('d', happinessLine(dataset.happiness.filter(happinessLine.defined())));


    linechart.select('.gdp')
        .append('defs')
        .append('clipPath')
        .attr('id', 'path-segments')

    // append dots to existing datapoints
    linechart.select('.gdp')
        .selectAll("circle")
        .data(dataset.filter(function(d) { return d.gdp; }))
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y0(d.gdp); });

    linechart.select('.happiness')
        .selectAll("circle")
        .data(dataset.filter(function(d) { return d.happiness; }))
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y1(d.happiness); });


    // append all axis
    linechart.append("g")
        .attr('class', 'axis')
        .attr('id', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    linechart.append("g")
        .attr('class', 'axis')
        .attr('id', 'y0axis')
        .call(yAxisLeft);

    linechart.append("g")
        .attr('class', 'axis')
        .attr('id', 'y1axis')
        .attr("transform", "translate(" + width + " ,0)")
        .call(yAxisRight);

}
