/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file contains two functions: a function that builds and updates the
worldmap, and a function that builds the legend.
*/

function drawWorldmap(mapData, migrationData, year, category){

    // select chosen year and category
    var data = mapData[year][category];

    var dataset = {};

    var knownValues = Object.keys(data).map(function (key) { return data[key]; });

    // delete unknown values from array
    for (i = 0; i < knownValues.length; i++) {
        if (knownValues[i] == 'unknown') {
            knownValues.splice(i, 1)
            i -= 1;
        }
    }

    var minValue = Math.min.apply(null, knownValues);
    var maxValue = Math.max.apply(null, knownValues);

    // create color palette function
    // color can be whatever you wish
    var paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#EFEFFF", "#02386F"]); // blue color


    // fill dataset in appropriate format
    Object.keys(data).forEach(function(item) {

        var value = data[item]

        dataset[item] = {gdp: value, fillColor: paletteScale(value)};

    });


    var map = new Datamap({
        element: document.getElementById('container1'),

        scope: 'world',
        geographyConfig: {
            borderColor: 'rgba(255,255,255,0.3)'
        },

        fills: {
            A:     '#deebf7',
            B:     '#9ecae1',
            C:     '#4292c6',
            D:     '#2171b5',
            E:     '#08519c',
            defaultFill: '#bdbdbd'
        },


        done: function(geography) {
            d3.selectAll('.datamaps-subunit')
                .on('click', function(geography) {

                    d3.selectAll('.piechart').remove();
                    d3.select('.linechart').remove();

                    currCountry = geography.id;

                    // drawLinechart(mapData, currCountry);
                    drawLinechart(mapData, currCountry)
                    drawPiechart(migrationData, '2010', currCountry, 'emigration');
                    drawPiechart(migrationData, '2010', currCountry, 'immigration');

                });
        },

        // displayed data on map
        data: dataset

    });
};
