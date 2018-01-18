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

        // drawLinechart();

        // drawImmigrationPiechart('data.csv');

    };
}
