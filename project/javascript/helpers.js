/*
helpers.js

Programmeerproject
Minor Programmeren (UvA)
Author: Christoffel Doorman
Student number: 10580557

File contains all function used in one or multiple javascript files.
*/

/*
This function converts a number into an international valuta format.
value: number to be converted
*/
function parseMoney(value) {
    return d3.format(",.0f")(value) + ' Intl$';
}

/*
This function rounds a number to one decimal.
value: number to be rounded
*/
function parseRate(value) {
    return d3.format('.1f')(value);
}

/*
This function places a comma for every thousant
value: number to be converted
*/
function parseNumber(value) {
    return d3.format(',')(value);
}

/*
This function returns the full name of a country codes
country: three-letter country code
*/
function findCountryName(country) {
    for (i = 0; i < countryCodes.length; i++) {
        if (countryCodes[i][1] == country) {
            return countryCodes[i][2];
        }
    }
    // if country not in list, return code
    return country;
}

/*
This function adds a tooltip to the geograph
container: the selected container
type: map, pie or line
*/
function addTooltip(container, type) {

    var tooltip = d3.select(container).append('div')
        .attr('class', 'tooltip')
        .attr('id', 'tooltip-' + type)
        .style("display", "none");

    return tooltip;

}

/*
This function displays the tooltip when mouseover
tooltip: the hidden tooltip
*/
function mouseover(tooltip) {
    tooltip.transition()
        .duration(200)
        .style("display", "inline");
}

/*
This function lets tooltip follow the mouse when mouseover
mouse: mouse location ([x, y])
tooltip: the added tooltip
*/
function mousemove(mouse, tooltip) {
    tooltip.style("left", (mouse[0]) + "px")
        .style("top", (mouse[1]) + "px");

}

/*
This function hides the tooltip when mouseout
tooltip: the added tooltip
*/
function mouseout(tooltip) {
    tooltip.transition()
        .duration(100)
        .style("display", "none");
}

/*
This function colors the buttons whether it is selected or not
element: this
*/
function buttonColor(element) {

    currValue = element.getAttribute('value');
    currClass = element.getAttribute('class');
    currID = '#' + currClass.split(' ')[2]
    currColor = d3.select(element).style('background-color');

    // do nothing if already selected button in pressed
    if (( currValue != prevValue || currClass.split(' ')[2] != prevClass )
          && currColor != 'rgb(189, 189, 189)' ) {
        // switch colors of buttons
        if ((currValue == 0) && (d3.select(element).style('background-color') == 'rgb(240, 240, 240)')) {
            d3.select(currID + '0').style('background-color', 'rgb(189, 189, 189)');
            d3.select(currID + '1').style('background-color', 'rgb(240, 240, 240)');
        }

        else {
            d3.select(currID + '1').style('background-color', 'rgb(189, 189, 189)');
            d3.select(currID + '0').style('background-color', 'rgb(240, 240, 240)');
        }
    }
    prevValue = currValue;
    prevClass = currClass.split(' ')[2];
}

/*
This function displays info of no data when data is unkown
tooltip: the selected container
*/
function displayNoData(container) {
    d3.select('#' + container)
        .append('svg')
        .attr('class', 'no-data')
        .attr('width', '100%')
        .attr('height', '100%')
        .append("text")
        .attr('id', 'no-data')
        .attr("dx", (width / 2))
        .attr("dy", 0 - (height / 2))
        .attr("text-anchor", "middle")
        .text("Sorry, no data")
}
