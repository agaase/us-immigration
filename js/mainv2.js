var ww=window.innerWidth, wh=window.innerHeight, gridSize = Math.ceil(window.innerWidth/150);
var selectedYear=1840;
var startYr=1840;
var endYr = 2015;
var colors = {
  "main" : "#5D6068",
  "squareFill" : "#C7C7C1",
  "squareBorder" : "#B6B6B0",
  "graphBar" : "#C7C7C1"
}

var svg = d3.select("#container")
                .append("svg")
                .attr("width", $("#container").width())
                .attr("height", $("#container").height())
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
    "top" : 39.5,
    "width" : 11.6,
    "height" : 25.1,
    "values" : [4,5,6,1]
  },
  "caribbean" : {
    "left" : 20,
    "top" : 39.3,
    "width" : 10.9,
    "height" : 17.1,
    "values" : [2,3,1,1,2]
  },
  "south america" : {
    "left" : 18,
    "top" : 80.6,
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
    "top" : 39.5,
    "width" : 21.4,
    "height" : 46.9,
    "values" : [3,4,1,1,2,0]
  },
  "asia" : {
    "left" : 66.4,
    "top" : 35.4,
    "width" : 30.6,
    "height" : 35.27,
    "values" : [2,4,5,1,3]
  },
  "oceania" : {
    "left" : 95,
    "top" : 80.1,
    "width" : 20,
    "height" : 31.5,
    "values" : [5,4,1]
  }
}

//https://search-undp-uhzzk2e4xmpuedy3ys6war7364.us-east-1.es.amazonaws.com
  //http://localhost:9200
var runQ = function(q,c,type){
  $.ajax({
    type: "POST",
    url: "https://search-undp-uhzzk2e4xmpuedy3ys6war7364.us-east-1.es.amazonaws.com/immigration/"+(type || "country_yr") +"/_search",
    data: JSON.stringify(q),
    success: function(data){
      c(data);
    },
    dataType: "json"
  });
};

var textLabels = {
  "header" : {
    "title" :  "The Great American Immigration",
    "yr" : "1820-2010"
  }
}
var positions = {
  "header" : {
    "top"  : 10,
    "left" : 4,
  },
  "map" : {
    "top" : 50,
    "left" : 5,
    "height" : 50
  },
  "graph" : {
    "top" : 5,
    "left" : 50,
    "width" : 45,
    "height" : 12
  },
  "keys" : {
    "top" : 40,
    "left" : 5,
  },
  "laws" : {
    "top" : 27,
    "left" : 4
  }
}

var drawLaws = function(){
  var laws = svg.append("g")
                .attr("class","laws");
  var ct=0;
  for(var yr in laws_data){
    if(yr < (selectedYear-5) && yr > (selectedYear-20)  ){
      laws.append("text")
        .attr("x",(positions.laws.left/100)*ww+ct*250)
        .attr("y",(positions.laws.top/100)*wh)
        .style("font-size","75%")
        .style("fill",colors.main)
        .style("text-decoration","underline")
        .text(yr+" - "+laws_data[yr]["title"].substring(0,40));  
        ct++;
    }
    
  }
}

var drawHeader = function(){
  var header = svg.append("g");
  header.append("text")
        .attr("x",(positions.header.left/100)*ww)
        .attr("y",(positions.header.top/100)*wh)
        .style("font-size","200%")
        .style("fill",colors.main)
        .text(textLabels.header.title);
  header.append("text")
        .attr("x",(positions.header.left/100)*ww)
        .attr("y",((positions.header.top+7)/100)*wh)
        .style("font-size","200%")
        .style("fill",colors.main)
        .text(textLabels.header.yr);
}

var drawKeys = function(sqV){
  var keys = svg.append("g")
                .attr("class","keys");
  keys.append("rect")
        .attr("x",(positions.keys.left/100)*ww)
        .attr("y",(positions.keys.top/100)*wh-gridSize/2)
        .style("width",gridSize)
        .style("height",gridSize)
        .style("fill",colors.main);
  keys.append("text")
        .attr("x",(positions.keys.left/100)*ww+gridSize*2)
        .attr("y",(positions.keys.top/100)*wh)
        .attr("alignment-baseline","central")
        .style("font-size","125%")
        .style("fill",colors.main)
        .text("~ "+(sqV > 1000 ? (parseInt(sqV/1000)+"k") : sqV)+" immigrants");
}

var changeYrIndicator = function(){
  var endYr = 2015;
  var w = (positions.graph.width/100)*ww;
  var x1 = (positions.graph.left/100)*ww
  var x = d3.scaleLinear()
              .domain([startYr-10, endYr+10])
              .range([x1,x1+w]);
  d3.select(".yrLabel")
    .text(selectedYear);
  d3.select("#yrInd")
         .transition()
         .duration(1000)
         .attr("transform","translate("+(x(selectedYear)-x(startYr))+",0)");
}

var drawGraph = function(){
  var graph = svg.append("g");
  var h = (positions.graph.height/100)*wh, w = (positions.graph.width/100)*ww;
  var x1 = (positions.graph.left/100)*ww, y1 = (positions.graph.top/100)*wh;
  var q = queries["per_yr"];
  runQ(q,function(data){
    data = data.aggregations.pr_yr.buckets.map(function(v){
        return {"yr" : v.key,"value" : v.sum_v.value};
    });
    var max=0,min=100000000000;
    for(var i=0;i<data.length;i++){
      if(data[i].value>max){
        max = data[i].value;
      }
      if(data[i].value<min){
        min = data[i].value;
      }
    }
    var x = d3.scaleLinear()
              .domain([startYr-10, endYr+10])
              .range([x1,x1+w]);
    var y = d3.scaleLinear()
              .domain([max, min])
              .range([y1,y1+h]);
    var xw = x(startYr)-x(startYr-10);

    // graph.append("rect")
    //      .attr("x",x(1830))
    //      .attr("y",y(y1))
    //      .attr("width",w)
    //      .attr("height",h)
    //      .style("fill",colors.graphBar)

    for(var i=0;i<data.length;i++){
       graph.append("rect")
             .attr("x",x(data[i].yr))
             .attr("y",y(data[i].value))
             .attr("width",xw)
             .attr("height",0)
             .style("fill",colors.graphBar)
             .transition()
             .delay(i*50)
             .duration(50)
             .attr("height",h-(y(data[i].value)-y1));
    }
    var yrInd = graph.append("g")
                     .attr("id","yrInd")
    yrInd.append("line")
         .attr("x1",x(startYr))
         .attr("y1",y1)
         .attr("x2",x(startYr))
         .attr("y2",y1+h)
         .style("stroke-dasharray", ("3, 3")) 
         .style("stroke",colors.main)
    yrInd.append("circle")
         .attr("cx",x(startYr))
         .attr("cy",y1+h)
         .style("r", "5px") 
         .style("fill",colors.main);

    yrInd.append("text")
         .attr("x",x(startYr))
         .attr("y",y(y1+h)+25)
         .attr("text-anchor","middle")
         .text("")
         .style("fill",colors.main)
         .attr("class","yrLabel")
  });
}

var drawRegions = function(values){
  var map = svg.append("g")
               .attr("id","map");
  var x = d3.scaleLinear()
         .domain([0, 100])
         .range([$("#container").width()*.05, $("#container").width()*.9]);
 var totHt = wh*(positions.map.height/100);
 var y = d3.scaleLinear()
         .domain([0, 100])
         .range([(positions.map.top/100)*wh, (positions.map.top/100)*wh+totHt])
  for(var regi in dummy){
    var region = dummy[regi];
    var x1 = x(region.left);
    var y1 = y(region.top);
    var values = region.values;
    var bound =  x(region.left + region.width);
    var reg = map.append("g")
                 .attr("id",regi);

    //Region name
    reg.append("text")
       .attr("x",x1)
       .attr("y",y1-5)
       .text(regi)
       .style("font-size","90%")
       .attr("class","regionLabel")
       .style("fill","#5D6068");
  }
}

var renderMap = function(){
  var q = queries["countries_yr"];
  if(selectedYear){
    q["query"]["bool"]["must"][0]["terms"]["yr"] = [selectedYear];
  }
  var map = d3.select("#map"), sqV;
  runQ(q,function(data){
      var regions = data.aggregations.rgion.buckets;

      //The scales for x and y for each region
      var x = d3.scaleLinear()
              .domain([0, 100])
              .range([$("#container").width()*.05, $("#container").width()*.9]);
      var totHt = wh*(positions.map.height/100);
      var y = d3.scaleLinear()
              .domain([0, 100])
              .range([(positions.map.top/100)*wh, (positions.map.top/100)*wh+totHt])

      //One square will represent 5000; just calculating the number of square for each country
      sqV=0;
      for(var z=0;z<regions.length;z++){
        if(dummy[regions[z].key]){
          var values2 = regions[z].country.buckets.map(function(cc){
            return parseInt(cc.sum_v.value);
          })
          var sum = values2.reduce(function(a, b) {
                                   return a + b;
                                 }, 0);
          var rw = x(dummy[regions[z].key].width)-x(0), rh = y(dummy[regions[z].key].height)-y(0);
          var ns = Math.floor(sum/(rw*rh/(gridSize*gridSize)));
          if(ns>sqV){
            sqV = ns;
          }
        }
      }

      for(var z=0;z<regions.length;z++){
        if(dummy[regions[z].key]){
          var values = regions[z].country.buckets.map(function(cc){
            return parseInt(cc.sum_v.value/sqV);
          })
          dummy[regions[z].key]["values"] = values;
        }
      }
      // Define the div for the tooltip
      var div = d3.select("body").append("div") 
          .attr("class", "tooltip")       
          .style("opacity", 0);

      debugger;
      var totCt = 0;
      for(var regi in dummy){
        var region = dummy[regi];
        var x1 = x(region.left);
        var y1 = y(region.top);
        var values = region.values;
        var bound =  x(region.left + region.width);
        var reg = d3.select("#"+regi);

        //Region name
        // reg.append("text")
        //    .attr("x",x1)
        //    .attr("y",y1-5)
        //    .text(regi)
        //    .style("font-size","14px")
        //    .attr("class","regionLabel")
        //    .style("fill","#5D6068")

          // reg.append("rect")
          //    .attr("x",x(region.left))
          //    .attr("y",y(region.top))
          //    .attr("width",x(region.width)-x(0))
          //    .attr("height",y(region.height)-y(0))
          //    .style("fill","none")
          //    .style("stroke","#dddddd");


        var xx = x1, yy=y1, matrix = [[]];
        for(var i=0;i<values.length;i++){
          var valueC = values[i]*sqV;
          var coun = reg.append("g")
              .attr("class","countryOnMap")
              .attr("title",values[i]*sqV)
              .on("mouseover", function(d) {   
                  div.transition()    
                      .duration(200)    
                      .style("opacity", .9);    
                  div.html($(event.currentTarget).attr("title"))  
                      .style("left", (d3.event.pageX) + "px")   
                      .style("top", (d3.event.pageY - 28) + "px");  
                  })          
              .on("mouseout", function(d) {   
                  div.transition()    
                      .duration(500)    
                      .style("opacity", 0); 
              });
          for(var j=0;j<(values[i]>0 ? values[i] : 0);j++){
            if(xx + gridSize > bound){
                xx = x1;
                yy += gridSize;
                matrix.push([]);
            }
            matrix[matrix.length-1].push({
              "x" : xx,
              "y" : yy,
              "id" : "c_"+i
            });
            coun.append("rect")
             .attr("x",window.innerWidth/2)
             .attr("y",window.innerHeight)
             .attr("width",gridSize)
             .attr("height",gridSize)
             .style("fill",values[i]<1 ? "none":colors.squareFill)
             .style("stroke",colors.squareBorder)
             .attr("c_id","c_"+i)
             
             .transition()
             .delay(totCt*(i+1)*100)
             .duration(50)
             .attr("transform", "translate("+(xx-window.innerWidth/2)+","+(yy-window.innerHeight)+")")
            xx += gridSize;
          }
          
        }
        totCt++;
        if(totCt>2){
          totCt=1;
        }
        for(var i=0;i<matrix.length;i++){
          for(var j=0;j<matrix[i].length;j++){

            //When next adjacent column node is different; draw a seperator
            if((j+1< matrix[i].length) && matrix[i][j].id != matrix[i][j+1].id){
              reg.append("line")
                 .attr("x1",matrix[i][j+1].x)
                 .attr("y1",matrix[i][j+1].y)
                 .attr("x2",matrix[i][j+1].x)
                 .attr("y2",matrix[i][j+1].y+gridSize)
                 .style("stroke","#F9F9F9")
                 .style("stroke-width","2px");
            }
            //When next adjacent row node is different; draw a seperator
            if((i+1< matrix.length) && matrix[i+1][j] && matrix[i][j].id != matrix[i+1][j].id){
              reg.append("line")
                 .attr("x1",matrix[i+1][j].x)
                 .attr("y1",matrix[i+1][j].y)
                 .attr("x2",matrix[i+1][j].x+gridSize)
                 .attr("y2",matrix[i+1][j].y)
                 .style("stroke","#F9F9F9")
                 .style("stroke-width","2px");
            }
          }
        }
      }
      drawKeys(sqV);
  });
}



var drawGrid = function(){
  var grid = svg.append("g");
  for(var i=0;i< ww;){
    grid.append("line")
           .attr("x1",i)
           .attr("y1",0)
           .attr("x2",i)
           .attr("y2",wh)
           .style("stroke","#EDEDED")
           .style("stroke-width","1px");
    i += gridSize;
  }
  for(var i=0;i< wh;){
    grid.append("line")
           .attr("x1",0)
           .attr("y1",i)
           .attr("x2",ww)
           .attr("y2",i)
           .style("stroke","#EDEDED")
           .style("stroke-width","1px");
    i += gridSize;
  }
}


drawGrid();
drawRegions();
drawHeader();
drawGraph();

// setTimeout(function(){
//   changeYrIndicator(); 
//   renderMap();
//   drawLaws();  
// },1000)


var loop = setInterval(function(){
  selectedYear += 10;
  if(selectedYear>=(endYr+10)){
    clearInterval(loop);
  }else{
    if(selectedYear>(endYr)){
      selectedYear = endYr;
    }
    $("#container #map .countryOnMap").remove();
    $(".keys").empty();
    $(".laws").empty();
    changeYrIndicator(); 
    renderMap();
    drawLaws();
  }
},2000)

// for(var i=0;i<container.length;i++){
// 	var side = (parseInt(Math.random()*10)+1);
// 	svg.append("circle")
// 	   .attr("cx",x(container[i].longitude))
// 	   .attr("cy",y(container[i].latitude))
// 	   .attr("r",side)
// 	   .style("fill","#888888")
// 	   .attr("id",container[i].name);
// }