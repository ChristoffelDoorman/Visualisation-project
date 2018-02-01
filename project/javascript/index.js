/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

In this file, all functions are called to draw, remove and update all
visualisations on users actions.
*/

// global variables
var prevValue;
var slider;

// default settings
var currYear = '2014';
var pieYear = '2015';
var currCategory = 'gdp';
var currCountry = 'NLD';

// button and slider option-lists
var years;
var pieYears;
var categories;



// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40};

window.onload = function(){

    // read in all datasets
    d3.queue()
        .defer(d3.json, '../data/mapData.json')
        .defer(d3.json, '../data/migrationData.json')
        .await(ready);

    // when datasets reading is ready, display data in visualisation
    function ready(error, mapData, migrationData) {
        if (error) throw window.alert('Sorry, something is wrong with the data');

        // store years and categories in lists
        years = Object.keys(mapData);
        pieYears = Object.keys(migrationData);
        categories = Object.keys(mapData[currYear]);

        // draw all visualisations
        drawWorldmap(mapData, migrationData, currYear, currCategory);
        drawLinechart();
        updateLinechart(mapData, currCountry);
        drawPiechart(migrationData, pieYear, currCountry, 'emigration');
        drawPiechart(migrationData, pieYear, currCountry, 'immigration');

        // redraw map to chosen year
        slider = document.getElementById("slider-years");
        slider.oninput = function() {

            // delete map and legend
            d3.select('.datamap').remove();
            d3.select('.datamaps-legend').remove();
            var indexYear = slider.value;

            // redraw map
            drawWorldmap(mapData, migrationData, indexYear, currCategory);
        };

        // redraw piecharts if year is changed
        d3.selectAll('.btn.btn-default.pie')
            .on('click', function(d) {

                // color button and remove piecharts after click
                buttonColor(this);
                d3.selectAll('.piechart').remove();
                var indexPieYear = this.getAttribute('value');
                pieYear = pieYears[indexPieYear];

                // redraw piecharts
                drawPiechart(migrationData, pieYear, currCountry, 'emigration');
                drawPiechart(migrationData, pieYear, currCountry, 'immigration');

            });


        // redraw map after chosen category
        d3.selectAll('.btn.btn-default.map')
            .on('click', function() {

                // change color of selected button and remove all visualisations
                buttonColor(this);
                d3.select('.datamap').remove();
                d3.select('.datamaps-legend').remove();
                d3.selectAll('.piechart').remove();

                // store the selected category by the user
                var indexCategory = this.getAttribute('value');
                currCategory = categories[indexCategory];

                // redraw all the visualizations
                drawWorldmap(mapData, migrationData, currYear, currCategory);
                updateLinechart(mapData, currCountry);
                drawPiechart(migrationData, '2010', currCountry, 'emigration');
                drawPiechart(migrationData, '2010', currCountry, 'immigration');
            });

    };

    // default button color
    d3.selectAll('.btn.btn-default').style('background-color', 'rgb(240, 240, 240');
    d3.selectAll('.btn.btn-default.start').style('background-color', 'rgb(189, 189, 189');
};
