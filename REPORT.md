# Project Report

## Story of visualisation

Since the ages of the hunting and gathering, people are constantly moving their living places all over the world. In the modern
world, most people's intention is not looking for new food or wildlife: people migrate because of their work, they
flee from war, social captivity, or other reasons. Two variables that may summarize these reasons, are Gross Domestic
Product (GDP) and happiness. This web-application shows the average GDP per capita and happiness rates of
countries in the world. Select a country and see what the the origins of immigrants and destinations of emigrants
are. Did those migrants seek for money or happiness?

## Description application

This projects contains three different interactive visualisations: a worldmap, a multiple-line chart with two different y-axi, and two pie charts. The visualisations provide two different interactive components: toggle buttons and a slider.

!(/doc/final-snap1.png)
!(/doc/final-snap2.png)
!(/doc/final-snap3.png)

#### Visualisation 1 (Worldmap)
The worldmap shows the GPD or happiness-grade per country. If you hover over a specific country, the information will be displayed in a pop-up (country, GDP, happiness-grade and possibly population). A toggle button lets the user choose between GPD and happiness: this choise will color the map in GPD- or happiness-rates. A slider lets the user change the year, from 2008 up till 2016. When the users clicks on a specific country, the line chart and pie charts change to the selected country.

#### Visualisation 2 (Multiple Line Chart)
The multiple line chart consists of a GPD-time line, and a happiness-time line. Because these lines do not have the same dimensions on the y-axis, two axi are drawn: a GPD-axis on the left of the chart and a happiness-axis on the right of the chart. When hovering with the mouse over the lines, a vertical line with a pop-up appears, showing the GPD and happiness values. The time-axis starts at 2008 and ends at 2016. The chart shows the country that is selected by clicking on a country in the worldmap.

#### Visualisation 3 (Pie charts)
There are two pie charts: one showing the countries from which immigrants originate (including the amount of immigrants), and one showing the countries where emigrants migrated (including the amount of emigrants). In addition, the total number of immigrants and emigrants is displayed above or underneath the pie charts. A toggle button lets the user choose between the years 2010 and 2015. The charts show the country that is selected by clicking on a country in the worldmap.

#### Interactive component 1 (Toggle buttons (2x))
Both the worldmap as the pie charts use toggle buttons. The worldmap lets the user choose between showing the GPD, or the happiness values. In order to implement these interactive components, ...

#### Interactive component 2 (Slider)
Beside the toggle button, the worldmap contains a slider which lets the user choose the year (2008-2016). In order to implement this interactive component, ...



## Technical design


## Challenges during process


## Decisions

