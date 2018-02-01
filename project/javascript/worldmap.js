/*
worldmap.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file contains the functions to draw and update the worldmap visualisations.
*/

/*
This function draws the worldmap and updates the linecharts and piecharts in
the event a country is clicked.
- mapData: data to be displayed in map and linecharts
- migrationData: data to be displayed in piecharts
- year: selected year (2008-2016)
- category: gdp or happiness
*/
function drawWorldmap(mapData, migrationData, year, category){

    // select data of chosen year and category and store in usuable structure
    var data = mapData[year][category];
    var dataset = prepareMapData(data, category);

    // create datamap
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

                    // get country code of clicked country
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

                // show tooltip with country and gdp or happiness data
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

        data: dataset
    });

    // draw legend
    drawLegend(category);
}

/*
This function creates the legend for the worldmap.
- category: gdp or happiness
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

/*
This function converts data into usuable format and assigns the fill keys
- data: gdp or happiness data to be shown on the map
- category: gdp or happiness
*/
function prepareMapData(data, category) {

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

    return dataset;
}

/*
This jQuery function shifts the tooltip of the slider towards the selector
Source: https://css-tricks.com/value-bubbles-for-range-inputs/
*/
$(function() {
 var el, newPoint, newPlace, offset;

 // Select all range inputs, watch for change
 $("input[type='range']").change(function() {

   // Cache this for efficiency
   el = $(this);

   // Measure width of range input
   width = el.width();

   // Figure out placement percentage between left and right of input
   newPoint = (el.val() - el.attr("min")) / (el.attr("max") - el.attr("min"));

   // Janky value to get pointer to line up better
   offset = -1.3;

   // Prevent bubble from going beyond left or right (unsupported browsers)
   if (newPoint < 0) { newPlace = 0; }
   else if (newPoint > 1) { newPlace = width; }
   else { newPlace = width * newPoint + offset; offset -= newPoint; }

   // Move bubble
   el
     .next("output")
     .css({
       left: newPlace,
       marginLeft: offset + "%"
     })
     .text(el.val());
 })
 // Fake a change to position bubble at page load
 .trigger('change');
});
