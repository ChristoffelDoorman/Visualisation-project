/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file contains two functions: a function that builds and updates the
worldmap, and a function that builds the legend.
*/

function drawWorldmap(data, year, category){

    // select chosen year and category
    data = data[year][category];
    console.log(data)

    var map = new Datamap({
        element: document.getElementById('container1'),

        fills: {
            HIGH: '#afafaf',
            LOW: '#123456',
            MEDIUM: 'blue',
            UNKNOWN: 'rgb(0,0,0)',
            defaultFill: 'green'
        },


            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    alert(geography.properties.name);
                });
            }
    });
};
