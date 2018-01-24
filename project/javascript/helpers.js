// function drawPage() {
//
//     // append svg for both piecharts
//     var piechart = d3.select('#container3').append('svg')
//         .attr('class', 'piechart rem')
//         .attr('height', 800)
//         .attr('width', 800)
//         .append('g')
//         .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
//
// }


// function prepareData(data) {
//     var par
// }


function buttonColor(element) {
    /*
    This function colors the buttons whether it is selected or not
    element: this
    */

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
