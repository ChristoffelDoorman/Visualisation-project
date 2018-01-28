# Design

## Data Sources
* [GDP per adult - wid.world](http://wid.world/data/): This data will be retrieved from a csv-file, which is ordered in the following representation: country,2008,2009,... A python script will extract these values and write them into a json file, containing the GDP- and happiness-values.
* [Happiness- and life-satisfaction - ourworldindata.org](https://ourworldindata.org/happiness-and-life-satisfaction/): This data will be retrieved from a csv-file, which is ordered in the the following representation: country,2008,country,2009,... A python script, different from the script that converts the GDP-values, will extract these values and write them into a json file, containing the GDP- and happiness-values.
* [International migration stock - www.un.org](http://www.un.org/en/development/desa/population/migration/data/estimates2/estimates17.shtml): This dataset is a bit complicated. The data is represented in a csv-file, which contains the migration values, along with destinations and origins. The file has the following representation: 2010,origin,destination1,destination2,...,2015,origin,destination1,destination2,... Because the viasualization contains a pie chart of both emigration as immigration, a python script has to read the csv-file in two different ways, as displayed below "Dataformats".

## Data formats
The data will be seperated into three json-files. The first json-file contains the GDP- and happiness-values of each country, the second json-file is created for the immigration pie chart, and the third json-file will be used for the emigration pie chart.

* The GDP- and happiness-values:
{"2008": {"AFG": {"country": "afganistan", "gdp": "...", "happiness": "..."}, {"ALG": {"country": "algeria", "gdp": "...", "happiness": "..."}, ...}, 

  "2010": {...}, ...}

* Emigration pie chart:
{"2010": {"AFG": {"origin": "afganistan", "destination1": {"country": "pakistan", "value": "..."}, "destination2": {"country": "india", "value": "..."}, ...}, {"ALG": {"origin": "algeria", "destination1": {"country": "somalia", "value": "..."}, ...},

  "2015": {"AFG": ...}}

* Immigration pie chart:
{"2010": {"AFG": {"destination": "afganistan", "origin1": {"country": "pakistan", "value": "..."}, "origin2": {"country": "india", "value": "..."}, ...}, {"ALG": {"destination": "algeria", "origin1": {"country": "somalia", "value": "..."}, ...},

  "2015": {"AFG": ...}}
  
## Sketch
![Project sketch](/doc/project_sketch.png)

## Visualisations and Interactive Components
This projects contains three different interactive visualisations: a worldmap, a multiple-line chart with two different y-axi, and two pie charts. The visualisations provide two different interactive components: toggle buttons and a slider.

### Visualisation 1 (Worldmap)
The worldmap shows the GPD or happiness-grade per country. If you hover over a specific country, the information will be displayed in a pop-up (country, GDP, happiness-grade and possibly population). A toggle button lets the user choose between GPD and happiness: this choise will color the map in GPD- or happiness-rates. A slider lets the user change the year, from 2008 up till 2016. When the users clicks on a specific country, the line chart and pie charts change to the selected country.

### Visualisation 2 (Multiple Line Chart)
The multiple line chart consists of a GPD-time line, and a happiness-time line. Because these lines do not have the same dimensions on the y-axis, two axi are drawn: a GPD-axis on the left of the chart and a happiness-axis on the right of the chart. When hovering with the mouse over the lines, a vertical line with a pop-up appears, showing the GPD and happiness values. The time-axis starts at 2008 and ends at 2016. The chart shows the country that is selected by clicking on a country in the worldmap.

### Visualisation 3 (Pie charts)
There are two pie charts: one showing the countries from which immigrants originate (including the amount of immigrants), and one showing the countries where emigrants migrated (including the amount of emigrants). In addition, the total number of immigrants and emigrants is displayed above or underneath the pie charts. A toggle button lets the user choose between the years 2010 and 2015. The charts show the country that is selected by clicking on a country in the worldmap.

### Interactive component 1 (Toggle buttons (2x))
Both the worldmap as the pie charts use toggle buttons. The worldmap lets the user choose between showing the GPD, or the happiness values. In order to implement these interactive components, ...

### Interactive component 2 (Slider)
Beside the toggle button, the worldmap contains a slider which lets the user choose the year (2008-2016). In order to implement this interactive component, ...

## Behind the scenes
All visualizations are managed from whitin the index.js. Here, functions to draw or update the visualizations are called from other files. For example, worldmap.js contains a function *drawWorldmap*, which is called in the index.js file whenever needed. When a button is clicked or a slider is moved, index.js removes one or more visualizations and redraws them, calling functions in other files. Functions that are used for multiple visualizations are stored in helpers.js, and called in index.js or any of the other .js files.

## Libraries
* D3 - //cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js
* Datamaps javascript - /datamaps.world.min.js
* Topojson - //cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js
* jQuery - http://code.jquery.com/jquery-latest.min.js
* Bootstrap javascript - //netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js
* Bootstrap stylesheet - //netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css

