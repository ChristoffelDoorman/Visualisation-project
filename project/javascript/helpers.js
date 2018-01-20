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


// function calcColorScale(data, year) {
// 
//
//
//
//   // TODO: minor, check how many data poins we've got
//   // with few datapoints the resulting legend gets confusing
//
//   // get values and sort
//   var data_values = Object.values(data).sort( function(a, b){ return a-b; });
//
//   quantiles_calc = quantiles.map( function(elem) {
//                   return Math.ceil(d3.quantile(data_values, elem));
//   });
//
//   let scale = d3.scaleQuantile()
//               .domain(quantiles_calc)
//               .range(d3.schemeReds[(quantiles_calc.length)-1]);
//
//   return scale;
