
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
        .orient("bottom").ticks(5);

    var yAxisLeft = d3.svg.axis().scale(y0)
        .orient("left").ticks(5);

    var yAxisRight = d3.svg.axis().scale(y1)
        .orient("right").ticks(5);

    var gdpLine = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y0(d.gdp); });

    var happinessLine = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y1(d.happiness); })

    // create svg
    var linechart = d3.select('#container2')
        .append('svg')
            .attr('class', 'linechart rem')
            .attr('width', '100%')
            .attr('height', 400)
        .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the range of the data
    x.domain(d3.extent(dataset, function(d) { return d.date; }));
    y0.domain([0, d3.max(dataset, function(d) {
    	return Math.max(d.gdp) + 5000; })]);
    y1.domain([0, 10]);

    // add the valueline path
    linechart.append("path")
        .attr("id", "gdpline")
        .attr("d", gdpLine(dataset))

    linechart.append("path")
        .attr("id", "happinessline")
        .style("stroke", "red")
        .attr("d", happinessLine(dataset));

    linechart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    linechart.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);

    linechart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + " ,0)")
        .style("fill", "red")
        .call(yAxisRight);

}
