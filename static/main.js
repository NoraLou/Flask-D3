$(function(){
  console.log("jquery works");
  createGraph();
});


function createGraph(){
  var width= 950;
  var height= 700 ;
  var format = d3.format(",d")//convert value to integer
  var color = d3.scale.category20();//create ordinal scale with 20 colors
  var sizeOfRadius = d3.scale.pow().domain([-100,100]).range([-50,50])

  var bubble = d3.layout.pack()
  .sort(null)  // disable sorting, use DOM tree traversal
  .size([width, height])  // chart layout size
  .padding(1)  // padding between circles
  .radius(function(d) { return 20 + (sizeOfRadius(d) * 30); });  // radius for each circle

  var svg = d3.select("#chart").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "bubble");

  d3.json("/data", function(error, quotes){
  var node = svg.selectAll('.node')
    .data(bubble.nodes(quotes)
    .filter(function(d) { return !d.children; }))
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'});

    node.append('circle')
      .attr('r', function(d) { return d.r; })
      .style('fill', function(d) { return color(d.symbol); });

    node.append('text')
      .attr("dy", ".3em")
      .style('text-anchor', 'middle')
      .text(function(d) { return d.symbol; });

    //tooltip styles
    // node.append("circle")
    //   .attr("r", function(d) { return d.r; })
    //   .style('fill', function(d) { return color(d.symbol); })
    //   .on("mouseover", function(d) {
    //     tooltip.text(d.name + ": $" + d.price);
    //     tooltip.style("visibility", "visible");
    //   })
    //   .on("mousemove", function() {
    //     return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    //   })
    //   .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
  });
}



