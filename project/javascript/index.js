/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file
*/

var defaultYear = '2014';
var defaultCategory = 'gdp';

var years = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']
var categories = ['gdp', 'happiness']

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



        drawWorldmap(mapData, defaultYear, defaultCategory);
        drawPiechart(migrationData, '2010', 'DZA', 'emigration')
        drawPiechart(migrationData, '2010', 'DZA', 'immigration')

        // With JQuery
        $('#slider').slider()
            .on('slide', function() {

                // remove all the visualizations
                d3.select('.datamap').remove()

                // store the selected year by the user
                var indexYears = this.getAttribute('value');
                currYear = years[indexYears];

                // redraw all the visualizations
                drawWorldmap(data, currYear, currCategory, currVariable);

            })




    };
}
