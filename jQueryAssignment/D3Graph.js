function renderGraph(arr_objs) {

var outerWidth = 900;
var outerHeight = 450;
var margin = { left: 80, top: 20, right: 20, bottom: 100 };
var barPadding = 0.05;

var xColumn = "Country Name";
var yColumn = "Population (Millions) - 2013";
var xAxisLabelOffset = 48;
var yAxisLabelOffset = 60;
var innerWidth  = outerWidth  - margin.left - margin.right;
var innerHeight = outerHeight - margin.top  - margin.bottom;

var svg = d3.select("#bPart").append("svg")
  .attr("width",  outerWidth)
  .attr("height", outerHeight);
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + innerHeight + ")");

var xAxisLabel = xAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", "translate(" + (innerWidth / 2) + "," + xAxisLabelOffset + ")")
  .attr("class", "label")
  .text(xColumn);

var yAxisG = g.append("g")
    .attr("class", "y axis");

var yAxisLabel = yAxisG.append("text")
    .style("text-anchor", "middle")
    .attr("transform", "translate(-" + yAxisLabelOffset + "," + (innerHeight / 2) + ") rotate(-90)")
    .attr("class", "label")
    .text(yColumn);

var xScale = d3.scale.ordinal().rangeBands([0, innerWidth],barPadding);
var yScale = d3.scale.linear().range([innerHeight, 0]);

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");

var yAxis = d3.svg.axis().scale(yScale).orient("left");

xScale.domain(arr_objs.map( function (d){ return d[xColumn]; }));
yScale.domain([0, d3.max(arr_objs, function (d){ return parseInt(d[yColumn]); })]);
xAxisG.call(xAxis);
yAxisG.call(yAxis);
var bars = g.selectAll("rect").data(arr_objs);
bars.enter().append("rect")
  .attr("width", xScale.rangeBand())
  .attr("fill","steelblue");
bars
  .attr("x",      function (d){return  xScale(d[xColumn]);})
  .attr("y",      function (d){return  yScale(d[yColumn]);})
  .attr("height", function (d){return  innerHeight - yScale(d[yColumn]);});
bars.exit().remove();
};
