/*
linechart.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

File contains functions to draw and update the linechart visualisation.
*/

// save all global linechart variable in object
var lineData = {};
var linechart;

/*
This function adds all elements to draw the line chart svg, axis, add scales,
initiates paths, title and the legend.
*/
function drawLinechart() {

    // set height and width
    lineData['width'] = width = 500;
    lineData['height'] = height = 400;

    // add scales
    lineData['x'] = x = d3.time.scale().range([0, width / 1.15 ]);
    lineData['y0'] = y0 = d3.scale.linear().range([height / 1.3, 70]);
    lineData['y1'] = y1 = d3.scale.linear().range([height / 1.3, 70]);

    // scale all axis
    lineData['xAxis'] = d3.svg.axis().scale(x)
        .orient('bottom').ticks(d3.timeYear);

    lineData['y0Axis'] = d3.svg.axis().scale(y0)
        .orient('left').ticks(5);

    lineData['y1Axis'] = d3.svg.axis().scale(y1)
        .orient('right').ticks(5);

    // add lines
    lineData['gdpLine'] = d3.svg.line()
        .defined(function(d) { return d.gdp })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y0(d.gdp); });

    lineData['happinessLine'] = d3.svg.line()
        .defined(function(d) { return d.happiness })
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y1(d.happiness); })

    // create svg
    linechart = d3.select('#container2')
        .append('svg')
        .attr('class', 'linechart rem')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // add tooltip
    lineData['tooltip'] = addTooltip('#container2', 'line');

    // append title
    linechart.append('text')
        .attr('id', 'linechartTitle')
        .attr('x', (width / 2.3))
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .style('font-size', '20px');

    // append line paths
    lineData['gdpline'] = linechart.append('g')
        .attr('class', 'gdp')
        .append('path')
        .attr('class', 'line');

    lineData['happinessline'] = linechart.append('g')
        .attr('class', 'happiness')
        .append('path')
        .attr('class', 'line');

    // append all axis
    linechart.append('g')
        .attr('class', 'axis')
        .attr('id', 'xaxis')
        .attr('transform', 'translate(0,' + height / 1.3 + ')')
        .append('text')
        .attr('transform', 'translate(' + ((width / 2) - 40) + ', 35)')
        .style('font-size', '15px')
        .text('Year');

    linechart.append('g')
        .attr('class', 'axis')
        .attr('id', 'y0axis');

    linechart.append('g')
        .attr('class', 'axis')
        .attr('id', 'y1axis')
        .attr('transform', 'translate(' + width / 1.15 + ' ,0)');

    // add legend
    linechart.append('g')
        .attr('class', 'line-legend')
        .attr('transform', 'translate(-10, 50)');
}

/*
This function appends and updates the data of the linechart
data: the data dispayed in the linecharts
country: the selected country
*/
function updateLinechart(data, country) {

    var countryName = findCountryName(country);

    // update linechart title
    d3.select('#linechartTitle')
        .text('GDP and happiness ' + countryName);

    // structure data in useable format
    var dataset = prepareLineData(data, country);

    // check if at least one datapoint is known
    var checker = checkData(dataset);

    // if gdp and happiness unknown, display in middle of svg
    if (!checker[0] && !checker[1]) {
        lineData.gdpline.attr('data-legend', function(d) { return 'GDP (No data)'; })
        lineData.happinessline.attr('data-legend', function(d) { return 'Happiness (No data)'; })
        linechart.append('text')
            .attr('class', 'no-data')
            .attr('dx', (width / 2 - 20))
            .attr('dy', (height / 2 - 20))
            .attr('text-anchor', 'middle')
            .text('Sorry, no data');

    // if one category completely unknown, display in legenda
    } else if (!checker[0]) {
        lineData.gdpline.attr('data-legend', function(d) { return 'GDP (No data)'; })
        lineData.happinessline.attr('data-legend', function(d) { return 'Happiness'; })
    } else if (!checker[1]) {
        lineData.gdpline.attr('data-legend', function(d) { return 'GDP (Intl$)'; })
        lineData.happinessline.attr('data-legend', function(d) { return 'Happiness (No data)'; })
    } else {
        lineData.gdpline.attr('data-legend', function(d) { return 'GDP (Intl$)'; })
        lineData.happinessline.attr('data-legend', function(d) { return 'Happiness'; })
    }

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
        .attr('d', lineData.gdpLine(dataset));

    happiness.select('.line')
        .transition()
        .duration(750)
        .attr('d', lineData.happinessLine(dataset));

    // update circles on data lines
    d3.selectAll('circle').remove();

    gdp.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .style('visibility', 'hidden')
        .transition()
        .delay(500)
        .attr('class', 'dot')
        .attr('r', 4)
        .attr('cx', function(d) { return x(d.date); })
        .attr('cy', function(d) { return y0(d.gdp); })
        .style('visibility', function(d) { return d.gdp !== null ? 'initial' : 'hidden'; })

    gdp.selectAll('circle')
        .on('mouseover', function(d) {

            mouseover(lineData.tooltip);

            lineData.tooltip.html('<b>Year: </b>' + parseTime(d.date) + '<br>' +
                    '<b>GDP: </b>' + parseMoney(d.gdp))
        })
        .on('mousemove', function() {
            var mouse = d3.mouse(this);
            mousemove(mouse, lineData.tooltip);
        })
        .on('mouseout', function() {
            mouseout(lineData.tooltip);
        });

    happiness.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .style('visibility', 'hidden')
        .transition()
        .delay(500)
        .attr('class', 'dot')
        .attr('r', 4)
        .attr('cx', function(d) { return x(d.date); })
        .attr('cy', function(d) { return y1(d.happiness); })
        .style('visibility', function(d) { return d.happiness !== null ? 'initial' : 'hidden'; })

    // show tooltips when mouseover
    happiness.selectAll('circle')
        .on('mouseover', function(d) {

            mouseover(lineData.tooltip);
            lineData.tooltip.html('<b> Year: </b>' + parseTime(d.date) + '<br>' +
                '<b>Happiness: </b>' + parseRate(d.happiness));
        })
        .on('mousemove', function() {
            var mouse = d3.mouse(this);
            mousemove(mouse, lineData.tooltip);
        })
        .on('mouseout', function() {
            mouseout(lineData.tooltip);
        });

    // call axistitles
    linechart.select('.line-legend')
        .call(d3.legend);
}


/*
This function converts the data into a specific form in a list that is
usable for the update function.
data: data that has to be converted
country: selected country
*/
function prepareLineData(data, country) {

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
