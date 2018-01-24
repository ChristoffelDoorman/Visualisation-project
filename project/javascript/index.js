/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file
*/

var currYear = '2014';
var currCategory = 'gdp';
var currCountry = 'AFG';

// global datasets
var mapData;
var migrationData;

var years;
var categories = ['gdp', 'happiness']

var prevValue;

// set margin, width and height
var margin = {top: 50, right: 30, bottom: 30, left: 40},
    width = 560 - margin.right - margin.left,
    height = 400 - margin.top - margin.bottom;


window.onload = function(){

    d3.queue()
        .defer(d3.json, 'project/mapData.json')
        .defer(d3.json, 'project/migrationData.json')
        .await(ready);

    function ready(error, mapData, migrationData) {
        if (error) throw window.alert('Sorry, something is wrong with the data');

        // store years and categories in list
        years = Object.keys(mapData);
        categroies = Object.keys(mapData['2008']);

        drawWorldmap(mapData, migrationData, currYear, currCategory);
        drawLinechart(mapData, currCountry);
        drawPiechart(migrationData, '2010', currCountry, 'emigration')
        drawPiechart(migrationData, '2010', currCountry, 'immigration')

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


        // redraw map after chosen category
        d3.selectAll('.btn.btn-default.map')
            .on('click', function() {

                // change color of selected button
                buttonColor(this);

                // remove all the visualizations
                d3.select('.datamap').remove()
                d3.selectAll('.piechart').remove()
                d3.select('.linechart').remove()
                // d3.select('.datamaps-legend').remove()
                // d3.selectAll('.rem').remove()

                // store the selected category by the user
                var indexCategory = this.getAttribute('value');
                currCategory = categories[indexCategory];

                // redraw all the visualizations
                drawWorldmap(mapData, migrationData, currYear, currCategory);
                drawLinechart(mapData, currCountry);
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
