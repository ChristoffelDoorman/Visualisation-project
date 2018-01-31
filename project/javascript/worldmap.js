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

    var stepsize = (maxValue - minValue) / 5;

    // create color palette function
    // color can be whatever you wish
    var paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#99ff33", "#006600"]);
            // .range('#d3d3d3', '#bdbdbd', '#a8a8a8', '#939393', '#7e7e7e');



    // fill dataset in appropriate format
    Object.keys(data).forEach(function(item) {

        var value = data[item]

        console.log(data)


        dataset[item] = {category: value, fillColor: paletteScale(value)};

    });


    var map = new Datamap({
        element: document.getElementById('container1'),

        scope: 'world',
        geographyConfig: {
            borderColor: 'rgba(255,255,255,0.3)'
        },

        fills: {
            defaultFill: '#bdbdbd'
        },


        done: function(geography) {
            d3.selectAll('.datamaps-subunit')
                .on('click', function(geography) {

                    currCountry = geography.id;

                    // if no data, alert user and draw previous piechart
                    if (migrationData[pieYear][currCountry] == undefined) {
                        alert("Sorry, there is no data about this country.");


                    } else if (migrationData[pieYear][currCountry]['emigration'] == undefined) {
                        alert("There is no emigration data about this country.")
                        d3.selectAll('.piechart').remove();
                        drawPiechart(migrationData, pieYear, currCountry, 'immigration');


                    } else if (migrationData[pieYear][currCountry]['immigration'] == undefined) {
                        alert("There is no immigration data about this country.")
                        d3.selectAll('.piechart').remove();
                        drawPiechart(migrationData, pieYear, currCountry, 'emigration');
                    } else {

                        d3.selectAll('.piechart').remove();

                        // drawLinechart(mapData, currCountry);
                        updateLinechart(mapData, currCountry)
                        drawPiechart(migrationData, pieYear, currCountry, 'emigration');
                        drawPiechart(migrationData, pieYear, currCountry, 'immigration');
                    }

                })
        },

        geographyConfig: {
            hideAntarctica: true,
            borderWidth: 1,
            borderOpacity: 1,
            borderColor: '#FDFDFD',
            popupTemplate: function(geography, data) {
                if (category == 'gdp') {
                    return '<div class="hoverinfo"><strong>' + geography.properties.name + ': ' + parseMoney(data['category']) + '</strong></div>';
                }
                if (category == 'happiness') {
                    return '<div class="hoverinfo"><strong>' + geography.properties.name + ': ' + parseFloat(data['category']).toFixed(1) + '</strong></div>';
                }
            },
            highlightFillColor: '#FC8D59',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 2,
            highlightBorderOpacity: 1

        },

        // displayed data on map
        data: dataset

    });
};


function drawLegend(category) {
    /*
    This function creates the legend for the worldmap.
    category: Obesity, Overweight or BMI
    */

    // BMI
    if (category == 'gdp') {
        map.legend({
            legendTitle: 'GDP per capita',
            defaultFillName: 'unknown',
            labels: {
                A: '< 22.5',
                B: '22.5 - 25',
                C: '25 - 27.5',
                D: '27.5 - 30',
                E: '> 30'
            }
        });
    }
    // Overweight or Obesity
    else {
        map.legend({
            legendTitle: 'Percentage of ' + category + ', ages 18+, in the World',
            defaultFillName: 'No Data',
            labels: {
                A: '< 20',
                B: '20 - 40',
                C: '40 - 60',
                D: '60 - 80',
                E: '80 - 100'
            }
        });
    }
}
