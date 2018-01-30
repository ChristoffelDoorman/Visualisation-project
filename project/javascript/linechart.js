// save all global linechart variable in object
var lineData = {};
var linechart;

function drawLinechart() {

    // add scales
    lineData["x"] = x = d3.time.scale().range([0, width]);
    lineData["y0"] = y0 = d3.scale.linear().range([height, 0]);
    lineData["y1"] = y1 = d3.scale.linear().range([height, 0]);

    // add axis
    lineData["xAxis"] = d3.svg.axis().scale(x)
        .orient("bottom").ticks(9)
        .ticks(d3.timeYear);

    lineData["y0Axis"] = d3.svg.axis().scale(y0)
        .orient("left").ticks(5);

    lineData["y1Axis"] = d3.svg.axis().scale(y1)
        .orient("right").ticks(5);

    // add lines
    lineData["gdpLine"] = d3.svg.line()
        .defined(function(d) { return d.gdp })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y0(d.gdp); });

    lineData["happinessLine"] = d3.svg.line()
        .defined(function(d) { return d.happiness })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y1(d.happiness); })

    // create svg
    linechart = d3.select('#container2')
        .append('svg')
        .attr('class', 'linechart rem')
        .attr('width', '100%')
        .attr('height', '100%')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    lineData["tooltip"] = d3.select('#container2').append('div')
        .attr('class', 'tooltip');

    // append title
    linechart.append("text")
        .attr('id', 'linechartTitle')
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")

    // append line paths
    linechart.append('g')
        .attr('class', 'gdp')
        .append("path")
        .attr("class", "line")

    linechart.append('g')
        .attr('class', 'happiness')
        .append("path")
        .attr("class", "line");

    // append all axis
    linechart.append("g")
        .attr('class', 'axis')
        .attr('id', 'xaxis')
        .attr("transform", "translate(0," + height + ")");

    linechart.append("g")
        .attr('class', 'axis')
        .attr('id', 'y0axis');

    linechart.append("g")
        .attr('class', 'axis')
        .attr('id', 'y1axis')
        .attr("transform", "translate(" + width + " ,0)");
}


function updateLinechart(data, country) {

    var formatTime = d3.time.format("%Y");

    // update linechart title
    d3.select('#linechartTitle')
        .text("GDP and happiness " + country);

    // structure data in useable format
    var dataset = prepareLineData(data, country);

    // scale the range of the data
    lineData.x.domain(d3.extent(dataset, function(d) { return d.date; }));
    lineData.y0.domain([0, d3.max(dataset, function(d) {
        return Math.max(d.gdp) + 5000; })]);
    lineData.y1.domain([0, 10]);

    // call all axis
    linechart.select('#xaxis')
        .call(lineData.xAxis);

    linechart.select('#y0axis')
        .call(lineData.y0Axis);

    linechart.select('#y1axis')
        .call(lineData.y1Axis);

    // update gdp and happiness lines
    var gdp = linechart.select('.gdp')
    var happiness = linechart.select('.happiness');

    gdp.select('.line')
        .transition()
        .duration(750)
        .attr("d", lineData.gdpLine(dataset));

    happiness.select('.line')
        .transition()
        .duration(750)
        .attr("d", lineData.happinessLine(dataset));

    // update circles on data lines
    d3.selectAll("circle").remove();

    gdp.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .style("visibility", "hidden")
        .transition()
        .delay(500)
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y0(d.gdp); })
        .style("visibility", "initial")

    gdp.selectAll('circle')
        .on('mouseover', function(d) {
            lineData.tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            lineData.tooltip.html('Year: ' + formatTime(d.date) + '<br>' +
                    'GDP: ' + parseMoney(d.gdp))
                // .style('left', (d3.event.pageX) + "px")
                // .style('top', (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            lineData.tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })

    happiness.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .style("visibility", "hidden")
        .transition()
        .delay(500)
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function(d) { return x(d.date); })
        .attr("cy", function(d) { return y1(d.happiness); })
        .style("visibility", "initial");

    happiness.selectAll('circle')
        .on('mouseover', function(d) {
            lineData.tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            lineData.tooltip.html('Year: ' + formatTime(d.date) + '<br>' + 'GDP: ' + d.happiness)
                // .style('left', (d3.event.pageX) + "px")
                // .style('top', (d3.event.pageY - 28) + "px")
        })
        .on("mouseout", function(d) {
            lineData.tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })
}


function prepareLineData(data, country) {

    // parse year to date format
    var parseDate = d3.time.format("%Y").parse;

    // create list to store datapoints
    var dataset = []

    // iterate over years and make dictionary gdp and happiness of each year
    for (i = 0; i < years.length; i++) {
        if (data[years[i]]['gdp'][country] == 'unknown') {
            gdpValue = null;
        }
        else {
            gdpValue = +data[years[i]]['gdp'][country];
        }

        if (data[years[i]]['happiness'][country] == 'unknown') {
            happinessValue = null;
        }
        else {
            happinessValue = +data[years[i]]['happiness'][country];
        }

        // add dictionary of each year to dataset list
        yearValue = parseDate(years[i]);
        dataset.push({'date': yearValue, 'gdp': gdpValue, 'happiness': happinessValue});
    }

    return dataset;
}
