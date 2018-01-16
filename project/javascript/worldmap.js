/*
index.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

This file contains two functions: a function that builds and updates the
worldmap, and a function that builds the legend.
*/

function drawWorldmap(){
  var map = new Datamap({
          element: document.getElementById('container1'),
          done: function(datamap) {
              datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                  alert(geography.properties.name);
              });
          }
      });
};
