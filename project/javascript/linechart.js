

function drawLinechart(){

    // create and call x axis

    var axisScale = d3.scale.linear()
                        .domain([0,100])
                        .range([0,100]);

    var xAxis = d3.svg.axis()
                    .scale(axisScale);

    // create svg
    var linechart = d3.select('#container2').append('svg')
        .attr('class', 'linechart rem')
            .attr('width', '100%')
            .attr('height', 400)
            .append('g')
            .attr('transform', 'translate(' + 2 * margin.left + ',' + margin.top + ')');

    // create x axis
    linechart.append('g')
        .attr('class', 'x axis rem')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

}
