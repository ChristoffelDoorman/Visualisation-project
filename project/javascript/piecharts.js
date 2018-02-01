/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

File contains functions to draw and update the piechart visualisations.
*/

// global object to store variables used in piecharts.js only
var pieData = {}

/*
This function draws a piechart.
- data: the data from migrationData.json
- year: the selected year (2010 or 2015)
- country: the selected country in the worldmap
- migrationType: emigration or immigration
*/
function drawPiechart(data, year, country, migrationType) {

    // prepare data
    var data = data[year][country][migrationType]
    data.forEach(function(d) {
        d.value = +d.value;
    })

    // make string of other countries and calculate total migration for labeling
    var othersLabel = makeOthersLabel(data);
    var totalMigration = countMigration(data);

    // append svg, tooltip and title
    if (migrationType == 'immigration') {

        pieData['tooltipImm'] = addTooltip('#container3', 'pie');

        var piechart = d3.select('#container3').append('svg')
            .attr('class', 'piechart rem')
            .attr('id', 'immigrationpie')
            .attr('height', 480)
            .attr('width', '100%')
            .append('g')
            .attr('transform', 'translate(' + 250 + ',' + 250 + ')')

        piechart.append('text')
            .attr('class', 'pieTitle')
            .attr('id', 'immigrationTitle')
            .attr('y', -height/1.8)
            .attr('text-anchor', 'middle')
            .style('font-size', '20px')
            .text('Countries of origin')
    }

    if (migrationType == 'emigration') {

        pieData['tooltipEmi'] = addTooltip('#container4', 'pie');

        var piechart = d3.select('#container4').append('svg')
            .attr('class', 'piechart rem')
            .attr('id', 'emigrationpie')
            .attr('height', 480)
            .attr('width', '100%')
            .append('g')
            .attr('transform', 'translate(' + 250  + ',' + 250 + ')')

        piechart.append('text')
            .attr('class', 'pieTitle')
            .attr('id', 'immigrationTitle')
            .attr('y', -height/1.8)
            .attr('text-anchor', 'middle')
            .style('font-size', '20px')
            .text('Countries of destination')
    }

    var countryName = findCountryName(country);

    // display selected country as text
    d3.select('#selected-country')
        .text("Migration of: " + countryName);

    // display total immigration or emigration inside piechart
    piechart.append('text')
        .attr('text-anchor', 'middle')
        .text('Total: ' + parseNumber(totalMigration));

    // add the arcs of the pie
    var arc = d3.svg.arc()
			.outerRadius(200)
			.innerRadius(80);

    // sort and add the pie-pieces
    var pie = d3.layout.pie()
			.sort(null)
			.value(function(d){ return d.value; });

    // enter data and show tooltip when mouseover
    var g = piechart.selectAll('.fan')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'fan')
        .on('mouseover', function(d) {

            // show tooltip when mouseover
            if (migrationType == 'immigration') {

                mouseover(pieData.tooltipImm);
                pieData.tooltipImm.html(function() {

                    if (d.data.country == 'Others') {
                        return ('<b>Others (' + parseNumber(d.value) +
                            '): <b>' + othersLabel);
                    } else {
                        return '<b>Country:</b> ' + d.data.name + '<br>' +
                            '<b>Immigrants: </b>' + parseNumber(d.value);
                    }
                })

            } else if (migrationType == 'emigration') {

                mouseover(pieData.tooltipEmi);
                pieData.tooltipEmi.html(function() {

                    if (d.data.country == 'Others') {
                        return '<b>Others (' + parseNumber(d.value) +
                            '): </b>' + othersLabel;
                    } else {
                        return '<b>Country: </b>' + d.data.name + '<br>' +
                            '<b>Emigrants: </b>' + parseNumber(d.value);
                    }
                })
            }
        })
        // let tooltip chase mouse
        .on('mousemove', function() {
            var mouse = d3.mouse(this);
            mouse[0] += 280;
            mouse[1] += 200;
            mousemove(mouse, pieData.tooltipImm);
            mousemove(mouse, pieData.tooltipEmi);
        })
        // hide tooltip when mouseout
        .on('mouseout', function() {
            mouseout(pieData.tooltipImm);
            mouseout(pieData.tooltipEmi);
        });

    // set color range
    var color = d3.scale.ordinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00', '#346084']);

    g.append('path')
    	.attr('d', arc)
    	.attr('fill', function(d){ return color(d.data.country); })

    g.append('text')
        .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
        .style('text-anchor', 'middle')
        .text(function(d) { return d.data.country; });
}

/*
This function creates a string containing top 6 countries and their values of
the countries in 'Others' of immigration and emigration piecharts.
- data: immigration or emigration data
*/
function makeOthersLabel(data) {

    // list with dictionaries of 'other countries'
    var info = data[data.length-1].info;

    // convert values to numbers
    info.forEach(function(d) {
        d.value = +d.value;
    })

    // append first country to list
    var otherMost = [info[0]];

    // set first country as lowest value
    var lowestCountry = info[0].name;
    var lowestValue = info[0].value;

    // iterate over all other countries in category 'info'
    for (i = 1; i < info.length; i++) {

        // if length list less than 6, append country to list
        if (otherMost.length < 6) {
            otherMost.push(info[i]);

            // if value of country lower than lowest, make new lowest
            if (info[i].value < lowestValue) {
                lowestCountry = info[i].name;
                lowestValue = info[i].value;
            }

        // if value of country is higher than lowest of list, swap them
        } else if (info[i].value > lowestValue) {

            // get index of lowest country and delete it from list
            for (j = 0; j < otherMost.length; j++) {
                if (otherMost[j].name == lowestCountry) {
                    otherMost.splice(j, 1);
                }
            }

            // append new country to list
            otherMost.push(info[i]);

            // search new lowest country in list
            lowestCountry = otherMost[0].name;
            lowestValue = otherMost[0].value;

            for (j = 1; j < otherMost.length; j++) {
                if (otherMost[j].value < lowestValue) {
                    lowestCountry = otherMost[j].name;
                    lowestValue = otherMost[j].value;
                }
            }
        }
    }

    // sort list from high to low
    otherMost.sort(function(a, b) {
        if(a.value > b.value) return -1;
        if(a.value < b.value) return 1;
        return 0;
    })

    // make string of country names and values
    var totalLabel = '';
    for (i = 0; i < otherMost.length; i++) {
        totalLabel += '<br>- ' + otherMost[i].name + ' (' +
            parseNumber(otherMost[i].value) + ')';
    }

    totalLabel += '<br>...'

    return totalLabel;
}

/*
This function counts the total immigrants or emigrants.
- data: immigration or emigration data
*/
function countMigration(data) {
    var totalMigration = 0;
    for (var i = 0; i < data.length; i++) {
        totalMigration += data[i]['value'];
    }

    return totalMigration
}
