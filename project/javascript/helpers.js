function addTooltip(container, type) {
    /*
    This function adds a tooltip to the graph.
    container: the selected container
    type: map, bar or scatter
    */

    tooltip = d3.select(container).append('div')
        .attr('class', 'hidden tooltip rem')
        .attr('id', 'tooltip' + type);
} 
