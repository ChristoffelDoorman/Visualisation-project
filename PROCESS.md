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
