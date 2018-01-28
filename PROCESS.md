# Daily resume

### Mon January 8

Initialized the project. Create the GitHub repository, READMY, LICENSE. Chosed the project topic and searched for supportive data. Created project proposal.


### Tue January 9

Searched for datasets. Had to adjust project proposal. One more visualisation different from map, scatterplot and linechart. Found one extra dataset about immigration and emigration that makes the project a bit more interesting. Decided to make two piecharts: one with countries of origin, one of countries of destination in 2010 or 2015.


### Wed January 10

Project proposal approved. Completed the three datasets: GDP.csv, happiness.csv and migration.csv. Created DESIGN.md file, a sort-of extension of the README.md file. Added LICENS file and .gitignore file.


### Thu January 11

Started working on scripts to convert csv files to json. migration.csv is complex and takes a lot of time and effort. Preperation for presentation on Friday.


### Fri January 12

First presentation went well. Continued working on scripts to convert migration.csv file to json. Created a simple worldmap on index.html, created worldmap.js file. Added necessary libraries.


### Mon January 15

I realized that another json-structure would be more useful for my gdp- and happiness-data. I changed structure {gdp{year{country}}} to {year{gdp{country}}} format. Had some problems when I tried to convert the gpd- and happines csv-files to json-format because of missing or miss-spelled country names. Furthermore, I made a layout for my visualisation platform and worked on my migration.csv to json script.


### Tue January 16

Resolved issue with country-names and codes by using country_code script of Robin Kuiper. Resolved issue to read out migration csv row by row while saving needed column-values. Migration data almost ready: have to do some sample checking to check correctness and have to convert country-names to codes with the country-code script.


### Wed January 17

Checked and finished migration data. Implemented worldmap.js and encountered some issues with the d3.json. Thought that the file had to be loaded from the directory of the index.js file, but had to call it from the location of the server.command file. Had some issues with the colloring of the map, but resolved it.


### Thu Januari 18

Started with the implementation of linechart.js and piechart.js. Had to adjust the dataset a bit. Implemented the slider but encountered the following issue: instead of a slider, the visualisation shows a textbox. 2008[textbox]2016 instead of 2008|------|--|2009. Resolved if "type" in the input element is set to "range" instead of "text"


### Fri Januari 19

Just before presentation, the visualisation of the piechart and linechart disappeared for unknown reasons. Restored later that day.


### Mon Januari 22

Implemented the piechart function. Encountered issues with the structure of the data. Had to store the values in a list: {year; {country: {migration: [{country, value}]}}} instead of {year; {country: {migraion: {country: value}}}}. Another problem that took a lot of time to discover was the data was not correctly formatted (1,000 instead of 1.000). Furthermore, in order to get only the big data in the pie chart, and store the smaller numbers in 'Others", I had to restructure the json file a lot. Managed to create a dictionary in the json with all other countries.


### Tue Januari 23

Changed the migration.json file a bit. Instead of the dictionary with {"country": "Others", "value": "number"}, I appended all countries into the dictionary: {"country": "Others", "value": "number", "info": [{"country": "FRA", "value": "number"}, {...}, ...]}. Worked further on the implementation of the linechart function with to y-axis.


### Wed Januari 24

Today I made all visualizations interactive. Solved the problem where the piecharts dissapeared when the category of the worldmap was changed. The problem was that I had to redraw the piechart, because they were linked to the worldmap. All visualisations are linked and work. That means I have to start working on the design and things like tooltips, layout, etc.


### Thu Januari 25

Today I was feeling sick and could not do so much.

![Project sketch](/doc/map2010.png) + ![Project sketch](/doc/map2014.png)


### Fri Januari 26

The same as yesterday.
