

function drawImmigrationPiechart(dataa){

    // create svg
    var immigrationChart = d3.select('#container3').append('svg')
        .attr('class', 'piechart rem')
            .attr('width', '100%')
            .attr('height', 400)
            .append('g')
            .attr('transform', 'translate(' + 2 * margin.left + ',' + margin.top + ')');

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.ordinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.population; });

    var path = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var label = d3.svg.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    d3.csv(dataa, function(d) {
      d.population = +d.population;
      return d;
    }, function(error, data) {

      var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d) { return color(d.data.age); });

      arc.append("text")
          .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
          .attr("dy", "0.35em")
          .text(function(d) { return d.data.age; });
    });



}


function drawEmigrationPiechart(){

    // create svg
    var chart = d3.select('#container4').append('svg')
        .attr('class', 'piechart rem')
            .attr('width', '100%')
            .attr('height', 400)
            .append('g')
            .attr('transform', 'translate(' + 2 * margin.left + ',' + margin.top + ')');

}
