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

    // create dictionary usable for datamaps
    var dataset = {};

    // fill dataset in appropriate format
    Object.keys(data).forEach(function(item) {

        var value = data[item]

        if (category == 'gdp') {

            if (value == "unknown") {
                fillColor = "default-fill";
            } else if (value < 5000) {
                fillColor = "A";
            } else if (value < 10000) {
                fillColor = "B";
            } else if (value < 15000) {
                fillColor = "C";
            } else if (value < 30000) {
                fillColor = "D";
            } else if (value < 50000) {
                fillColor = "E";
            } else if (value >= 50000) {
                fillColor = "F";
            }
        }

        if (category == 'happiness') {

            if (value == "unknown") {
                fillColor = "default-fill";
            } else if (value < 4) {
                fillColor = "A";
            } else if (value < 5) {
                fillColor = "B";
            } else if (value < 6) {
                fillColor = "C";
            } else if (value < 7) {
                fillColor = "D";
            } else if (value < 8) {
                fillColor = "E";
            } else if (value >= 8) {
                fillColor = "F";
            }
        }

        dataset[item] = {category: value, fillKey: fillColor};

    });


    map = new Datamap({
        element: document.getElementById('container1'),

        scope: 'world',
        geographyConfig: {
            borderColor: 'rgba(255,255,255,0.3)'
        },

        fills: {
            A:  '#b3c9db',
            B:  '#8daec9',
            C:  '#6693b7',
            D:  '#4179a5',
            E:  '#3a6c94',
            F:  '#2d5473',
            defaultFill: '#bdbdbd'
        },


        done: function(geography) {
            d3.selectAll('.datamaps-subunit')
                .on('click', function(geography) {

                    currCountry = geography.id;

                    // if no data, alert user and draw previous piechart
                    if (migrationData[pieYear][currCountry] == undefined) {
                        d3.selectAll('.piechart').remove();
                        displayNoData('container3');
                        displayNoData('container4');
                        updateLinechart(mapData, currCountry);


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
                if (data['category'] == "unknown") {
                    return '<div class="hoverinfo"><strong>' + geography.properties.name + ': unknown</strong></div>';
                }
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

    drawLegend(category);
}

/*
This function creates the legend for the worldmap.
category: gdp or happiness
*/
function drawLegend(category) {

    if (category == 'gdp') {
        map.legend({
            legendTitle: 'GDP per capita (Intl$) from 2008 till 2016',
            defaultFillName: 'No data',
            labels: {
                A: '< 5K',
                B: '5 - 1K',
                C: '10 - 15K',
                D: '15 - 30K',
                E: '30 - 50K',
                F: '> 50K'
            }
        });
    }

    if (category == 'happiness') {
        map.legend({
            legendTitle: 'Happiness rate from 2008 till 2016',
            defaultFillName: 'No Data',
            labels: {
                A: '< 4',
                B: '4 - 5',
                C: '5 - 6',
                D: '6 - 7',
                E: '7 - 8',
                F: '> 8'
            }
        });
    }
}
