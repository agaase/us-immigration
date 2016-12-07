var countryPoint = {}, ominlo=180,omaxlo=-180,ominla=90,omaxla=-90;


var svg = d3.select("#world")
                .append("svg")
                .attr("width", $("#world").width())
                .attr("height", $("#world").height())
                .attr("id","dyadsCont");
 
var dummy = {
  "america" : {
    "left" : 0,
    "top" : 0,
    "width" : 29,
    "height" : 31,
    "values" : [10,15,5]
  },
  "central america" : {
    "left" : 6.8,
    "top" : 31.5,
    "width" : 11.6,
    "height" : 25.1,
    "values" : [4,5,6,1]
  },
  "caribbean" : {
    "left" : 18,
    "top" : 34.3,
    "width" : 10.9,
    "height" : 17.1,
    "values" : [2,3,1,1,2]
  },
  "south america" : {
    "left" : 18,
    "top" : 56.6,
    "width" : 18.7,
    "height" : 43.4,
    "values" : [5,7,4,2,4,6,7,8]
  },
  "europe" : {
    "left" : 41.9,
    "top" : 0,
    "width" : 21.7,
    "height" : 31.5,
    "values" : [5,14,4,2,4,6,7,8,4,5,10,5]
  },
  "russia" : {
    "left" : 65.4,
    "top" : 0,
    "width" : 36.6,
    "height" : 27.1,
    "values" : [9]
  },
  "africa" : {
    "left" : 41.9,
    "top" : 31.5,
    "width" : 21.4,
    "height" : 46.9,
    "values" : [3,4,1,1,2,0]
  },
  "asia" : {
    "left" : 63.4,
    "top" : 35.4,
    "width" : 25.6,
    "height" : 35.27,
    "values" : [2,4,5,1,3]
  },
  "oceania" : {
    "left" : 80,
    "top" : 71.1,
    "width" : 20,
    "height" : 31.5,
    "values" : [5,4,1]
  }
}

//https://search-undp-nnvlmicmvsudjoqjuj574sqrty.us-west-2.es.amazonaws.com
  //http://localhost:9200
var runQ = function(q,c,type){
  $.ajax({
    type: "POST",
    url: "http://localhost:9200/immigration/"+(type || "country_yr") +"/_search",
    data: JSON.stringify(q),
    success: function(data){
      c(data);
    },
    dataType: "json"
  });
};

var render = function(yr){
  var q = queries["countries_yr"];
  if(yr){
    q["query"]["bool"]["must"][0]["terms"]["yr"] = [yr];
  }
  runQ(q,function(data){
      var regions = data.aggregations.rgion.buckets;
      for(var z=0;z<regions.length;z++){
        if(dummy[regions[z].key]){
          var values = regions[z].country.buckets.map(function(cc){
            return parseInt(cc.sum_v.value >= 5000 ? cc.sum_v.value/5000 : 0.5);
          })
          dummy[regions[z].key]["values"] = values;
        }
      }
      var sideValue = 5, gapValue=5, countryValGap = 1, minCols = 25;
      var x = d3.scaleLinear()
              .domain([0, 100])
              .range([0, $("#world").width()]);
      var totHt = $("#world").height();
      var y = d3.scaleLinear()
              .domain([0, 100])
              .range([0, totHt]);

      for(var reg in dummy){
        var region = dummy[reg];
        var x1 = x(region.left);
        var y1 = y(region.top);
        var values = region.values;
        var xx = x1, yy=y1;
        var bound =  x(region.left + region.width);
        var w = x(region.width);
        var h = parseInt(region.height*.01*totHt);
        var reg = svg.append("g")
                     .attr("id",reg);
        reg.append("rect")
           .attr("x",x(region.left))
           .attr("y",y(region.top))
           .attr("width",x(region.width))
           .attr("height",y(region.height))
           .style("fill","none")
           .style("stroke","#dddddd");

        var columnsCt = Math.floor(w/(minCols*sideValue)), cols=[];
        for(var cm=0;cm<columnsCt;cm++){
          cols[cm] = 0;
        }

        for(var c=0;c<values.length;c++){
          var coun = reg.append("g");
          // if((xx + values[c]*sideValue + gapValue) >= bound){
          //   xx = x1;
          //   yy += (sideValue+gapValue);
          // }
          if(values[c]<1){
            // //Circle for numbers less than 5000;
            // coun.append("circle")
            //   .attr("cx",xx+sideValue/3)
            //   .attr("cy",yy+sideValue/3)
            //   .attr("r",sideValue/3)
            //   .style("fill","none")
            //   .style("stroke","#888888")
            //   xx += sideValue+countryValGap;
          }else{
            
            
            var valRows = Math.ceil(values[c]/minCols+2);
            for(var cm=0;cm<columnsCt;cm++){
              if((cols[cm]+valRows*sideValue)<h){
                   var startX = xx + sideValue*cm*(minCols);

                   coun.append("rect")
                      .attr("x",startX)
                      .attr("y",yy + cols[cm])
                      .attr("width",minCols*sideValue)
                      .attr("height",valRows*sideValue)
                      .style("fill","none")
                      .style("stroke","#000000")

                   var xxx = startX;
                   var yyy = yy + cols[cm];
                   for(var k=0;k<values[c];k++){
                      coun.append("rect")
                      .attr("x",xxx)
                      .attr("y",yyy)
                      .attr("width",sideValue)
                      .attr("height",sideValue)
                      .style("fill","#888888")
                      .style("stroke","#000000")
                      .style("stroke-width",0.3)
                      if((xxx-startX) >= minCols*sideValue){
                        xxx = startX;
                        yyy += sideValue;
                      }else{
                        xxx += sideValue;
                      }
                   }
                  cols[cm] += valRows*sideValue;
                break;
              }
            }

            // for(var k=0;k<values[c];k++){
            //   coun.append("rect")
            //   .attr("x",xx)
            //   .attr("y",yy)
            //   .attr("width",sideValue)
            //   .attr("height",sideValue)
            //   .style("fill","#888888");
            //   xx += sideValue+countryValGap;
            //   if(xx > bound ){
            //     xx = x1;
            //     yy += sideValue+countryValGap;
            //   }
            // }
          }
          
          //xx +=  gapValue;
        }
      }
  });
}

render(2010);

// var yr = 1830;
// var loop = setInterval(function(){
//   $("#world svg").empty();
//   $(".yr").text(yr);
//   render(yr);
//   yr += 10;
//   if(yr>2010){
//     clearInterval(loop);
//   }
// },1000)

// for(var i=0;i<world.length;i++){
// 	var side = (parseInt(Math.random()*10)+1);
// 	svg.append("circle")
// 	   .attr("cx",x(world[i].longitude))
// 	   .attr("cy",y(world[i].latitude))
// 	   .attr("r",side)
// 	   .style("fill","#888888")
// 	   .attr("id",world[i].name);
// }