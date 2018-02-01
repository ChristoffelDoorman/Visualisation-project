# Programmeerproject - Chasing the money or happiness?
People all over the world are migrating from country to country. Some are refugees, fleeing war, poor healthcare or flee because of juristical reasons. Others migrate in order to find more happiness or a higher salary in another country.

[Click here to redirect to the application](https://stof95.github.io/Programmeerproject/project/html)

## Project Proposal
The data visualtization excists of four views: a woldmap, a linechart with a horizontal time axis and two y-axi: a GDP and a happiness axis. The worldmap has a buttontool, which let the user choose to display happiness or GDP values on the map. Furthermore, the user can slide a slider to choose the year, between 2008 and 2016. If the user clicks on a country in the worldmap, the linecharts change to the selected country, and two pie charts appear of the selected country. One pie chart displayes the immigration with countries of origin. The other pie chart displayes the emigration, with countries of destiny. Which year the pie charts show, can be chosen by the user with a drop-down menu (options: 2010 and 2015). See the [design document](/DESIGN.md) for more information.

![](/doc/final-snap1.png)
![](/doc/final-snap2.png)
![](/doc/final-snap3.png)


## Sources

### Data Sources
* [GDP per adult](http://wid.world/data/)
* [Happiness- and life-satisfaction](https://ourworldindata.org/happiness-and-life-satisfaction/)
* [International migration stock](http://www.un.org/en/development/desa/population/migration/data/estimates2/estimates17.shtml)

### Code Sources
* [Country codes](https://data.mprog.nl/course/30%20Homework/140%20D3%20Map/countries.js) - Author: Robin Kuiper (2014)
* [Datamaps](http://datamaps.github.io/)
* [Worldmap](http://bl.ocks.org/tomschulze/961d57bd1bbd2a9ef993f2e8645cb8d2)
* [Piecharts](https://bl.ocks.org/mbostock/3887235)
* [Slider tooltip](https://css-tricks.com/value-bubbles-for-range-inputs/)

### Libraries
* d3.min.js - Copyright (c) 2010-2016, Michael Bostock
* bootstrap.min.js - Copyright 2011-2017, The Bootstrap Authors
* jQuery v3.2.1 - Copyright (c) JS Foundation
* d3.legend.js - Copyright (c) 2012, ziggy.jonsson.nyc@gmail.com
* topojson.js - Copyright (c) 2012-2016, Michael Bostock All rights reserved

### CSS files
* bootstrap.min.css - Copyright 2011-2016, Twitter, Inc.


*Copyright (c) 2018, Christoffel Doorman*
