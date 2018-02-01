/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

In this file, all functions are called to draw, remove and update all
visualisations on users actions.
*/

var currYear = '2014';
var pieYear = '2015';
var currCategory = 'gdp';
var currCountry = 'NLD';

// global datasets
var mapData;
var migrationData;

var years;
var pieYears = ['2010', '2015'];
var categories = ['gdp', 'happiness'];

var prevValue;

// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40};
    // width = 560 - margin.right - margin.left,
    // height = 400 - margin.top - margin.bottom;


window.onload = function(){

    // read in all datasets
    d3.queue()
        .defer(d3.json, '../data/mapData.json')
        .defer(d3.json, '../data/migrationData.json')
        .await(ready);

    // when datasets reading is ready,
    function ready(error, mapData, migrationData) {
        if (error) throw window.alert('Sorry, something is wrong with the data');




        // store years and categories in list
        years = Object.keys(mapData);
        categroies = Object.keys(mapData['2008']);

        drawWorldmap(mapData, migrationData, currYear, currCategory);
        drawLinechart(mapData, currCountry);
        updateLinechart(mapData, currCountry);


        drawPiechart(migrationData, pieYear, currCountry, 'emigration')
        drawPiechart(migrationData, pieYear, currCountry, 'immigration')

        // // With JQuery
        // $('#slider').slider()
        //     .on('slide', function() {
        //
        //         // remove all the visualizations
        //         d3.select('.datamap').remove()
        //
        //         // store the selected year by the user
        //         var indexYears = this.getAttribute('value');
        //         currYear = years[indexYears];
        //
        //         // redraw all the visualizations
        //         drawWorldmap(data, currYear, currCategory, currVariable);
        //
        //     })

        var slider = document.getElementById("slider-years");
        var output = document.getElementById("demo");
        // output.innerHTML = slider.value; // Display the default slider value

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function() {

            d3.select('.datamap').remove();
            d3.select('.datamaps-legend').remove();

            var indexYear = slider.value

            drawWorldmap(mapData, migrationData, indexYear, currCategory);
        }

        d3.selectAll('.btn.btn-default.pie')
            .on('click', function(d) {

                buttonColor(this);

                d3.selectAll('.piechart').remove();

                var indexPieYear = this.getAttribute('value');
                pieYear = pieYears[indexPieYear];

                drawPiechart(migrationData, pieYear, currCountry, 'emigration');
                drawPiechart(migrationData, pieYear, currCountry, 'immigration');

            })



        // redraw map after chosen category
        d3.selectAll('.btn.btn-default.map')
            .on('click', function() {

                // change color of selected button
                buttonColor(this);

                // remove all the visualizations
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

        // // update linechart and piecharts to selected country
        // d3.selectAll('.datamaps-subunit')
        //     .on('click', function(geography) {
        //
        //         d3.selectAll('.piechart').remove();
        //         d3.select('.linechart').remove();
        //
        //         currCountry = geography.id;
        //
        //         drawLinechart(mapData, currCountry);
        //         drawPiechart(migrationData, '2010', currCountry, 'emigration');
        //         drawPiechart(migrationData, '2010', currCountry, 'immigration');
        //
        //     });

    };

    // default button color
    d3.selectAll('.btn.btn-default').style('background-color', 'rgb(240, 240, 240');
    d3.selectAll('.btn.btn-default.start').style('background-color', 'rgb(189, 189, 189');
}
