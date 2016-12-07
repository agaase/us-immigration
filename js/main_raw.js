
var x = d3.scaleLinear()
              .domain([-180, 180])
              .range([0, window.innerWidth]);

var y = d3.scaleLinear()
              .domain([90, -90])
              .range([0, window.innerHeight]);
var svg = d3.select("#world")
                .append("svg")
                .attr("width", window.innerWidth)
                .attr("height", window.innerHeight)
                .attr("id","dyadsCont");


for(var i=0;i<world.features.length;i++){
	var c = world.features[i];
	for(var k=0;k<c.geometry.coordinates.length;k++){
		var lines = [];
		if(c.geometry.coordinates.length>1){
			var coor = c.geometry.coordinates[k][0];
		}else{
			var coor = c.geometry.coordinates[k];
		}
		for(var j=0;j<coor.length;j++){
			lines.push({
	          "x" : x(coor[j][0]),
	          "y" : y(coor[j][1])
	      });
		}
		var lineFunction = d3.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; })

    	var lineGraph = svg.append("path")
                              .attr("d", lineFunction(lines))
                              .attr("stroke", "#000000" )
                              .attr("fill", "none")
                              .attr("id",c.properties.name)
                              .style("stroke-width","1px");
	}
	
   
}


