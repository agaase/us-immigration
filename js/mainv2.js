var ww=window.innerWidth, wh=window.innerHeight, gridSize = Math.ceil(window.innerWidth/120);
var selectedYear=2010;
var startYr=1830;
var endYr = 2015;
var colors = {
  "main" : "#5D6068",
  "squareFill" : "#C7C7C1",
  "squareFillLess" : "#dddddd",
  "squareBorder" : "#B6B6B0",
  "graphBar" : "#C7C7C1"
}

var svg = d3.select("#container")
                .append("svg")
                .attr("width", $("#container").width())
                .attr("height", $("#container").height())
                .attr("id","dyadsCont");
// Define the div for the tooltip
var tooltipDiv = d3.select("body").append("div") 
      .attr("class", "tooltip")       
      .style("opacity", 0);
 
var dummy = {
  "america" : {
    "left" : 0,
    "top" : 0,
    "width" : 29,
    "height" : 31,
    "values" : [10,15,5]
  },
  "central_america" : {
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
  "south_america" : {
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

//http://35.161.122.132:9200
  //http://localhost:9200
var runQ = function(q,c,type){
  $.ajax({
    type: "POST",
    url: "http://35.161.122.132:9200/immigration/"+(type || "country_yr") +"/_search",
    data: JSON.stringify(q),
    success: function(data){
      c(data);
    },
    dataType: "json"
  });
};

var textLabels = {
  "header" : {
    "title" :  "Immigration to USA",
    "yr" : "1820 -- 2010"
  }
}
var positions = {
  "header" : {
    "top"  : 10,
    "left" : 4,
    "height" : 12,
  },
  "map" : {
    "top" : 45,
    "left" : 5,
    "height" : 55,
    "width" : 95
  },
  "graph" : {
    "top" : 5,
    "left" : 4,
    "width" : 30,
    "height" : 12
  },
  "keys" : {
    "top" : 37,
    "left" : 6,
  },
  "laws" : {
    "top" : 32,
    "left" : 4
  }
}

var drawLaws = function(){
  var laws = svg.append("g")
                .attr("class","laws");
  var ct=0, x1=((100-positions.laws.left)/100)*ww-gridSize;

  //Trying to read the years in the descending order
  var yrs = Object.keys(laws_data).sort(function(a,b){
    return b-a;
  })

  for(var i=0;i<yrs.length;i++){
    var yr = yrs[i];
    if(yr < (selectedYear-5) && yr > (selectedYear-20)  ){
      var text = laws.append("text")
        .attr("x",x1)
        .attr("y",(positions.laws.top/100)*wh)
        .on("click", function(d) {   
            $(".tooltip").removeClass("small big").addClass("big");
            var x =    d3.event.pageX;
            if(x + .3*ww>ww){
              x = x - .3*ww;
            }
            tooltipDiv.transition()    
                .duration(200)    
                .style("opacity", .9);    
            tooltipDiv.html($(event.currentTarget).attr("title"))  
                .style("left", x + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })          
        .on("mouseout", function(d) {   
            tooltipDiv.transition()    
                .duration(50)    
                .style("opacity", 0)
                .style("left", "-1000px")   
        })
        .attr("title",laws_data[yr]["desc"])
        .style("font-size","100%")
        .style("fill",colors.main)
        .style("cursor","pointer")
        .attr("text-anchor","end")
        .style("text-decoration","underline")
        .text(yr+" - "+laws_data[yr]["title"].substring(0,40));  
        ct++;
        x1 -= text.node().getBBox().width+ww*.01;
    }
    
  }
}

var drawHeader = function(){
  var header = svg.append("g");

  
  var newx = (positions.header.left/100)*ww+(positions.header.height/100)*wh/2+gridSize*2;
  var text = header.append("text")
        .attr("x",newx)
        .attr("y",(positions.header.top/100)*wh)
        .style("font-size",3*gridSize)
        .style("fill",colors.main)
        .text(textLabels.header.title);
  var bbox = text.node().getBBox();
  header.append("image")
          .attr("x",(positions.header.left/100)*ww)
          .attr("y",bbox.y)
          .attr("width",(positions.header.height/100)*wh/2)
          .attr("height",(positions.header.height/100)*wh)
          .attr("xlink:href","images/LOGO.png");

  var sub = header.append("text")
        .attr("x",newx)
        .attr("y",((positions.header.top)/100)*wh + bbox.height + ((positions.header.height/100)*wh - 2*bbox.height) )
        .style("font-size", 2*gridSize)
        .style("fill",colors.main)
        .text(textLabels.header.yr);

  var box = sub.node().getBBox();
  header.append("svg:image")
        .attr('x',newx+box.width+gridSize*2)
        .attr('y',box.y+gridSize/2)
        .attr('width', gridSize*2)
        .style("cursor","pointer")
        .on("click",function(){
              selectedYear = startYr;
              changeYr(selectedYear);
              var loop = setInterval(function(){
              selectedYear += 10;
              if(selectedYear>=(endYr+10)){
                clearInterval(loop);
              }else{
                if(selectedYear>(endYr)){
                  selectedYear = endYr;
                }
                changeYr(selectedYear);
              }
              
            },2000)
        })
        .attr('height', gridSize*2)
        .attr("xlink:href","images/play.png");

    header.append("text")
         .attr("x",newx+sub.node().getBBox().width+gridSize*4)
         .attr("y",box.y+gridSize/2)
         .attr("alignment-baseline","text-before-edge")
         .text("Play Timeline")
         .style("cursor","pointer")
         .style("fill",colors.main)
         .style("font-size","100%")
         .attr("class","");

}

var drawKeys = function(sqV){
  var keys = svg.append("g")
                .attr("class","keys");
  var x1  = ((positions.keys.left)/100)*ww;
  x1 = Math.floor(x1/gridSize)*gridSize;

  keys.append("rect")
        .attr("x",x1)
        .attr("y",(positions.keys.top/100)*wh-gridSize/2)
        .style("width",gridSize)
        .style("height",gridSize)
        .style("fill",colors.main);

  var text = keys.append("text")
        .attr("x",x1+gridSize*2)
        .attr("y",(positions.keys.top/100)*wh)
        .attr("alignment-baseline","central")
        // .attr("text-anchor","end")
        .style("font-size","100%")
        .style("fill",colors.main)
        .text("~ "+(sqV > 1000 ? (parseInt(sqV/1000)+"k") : sqV)+" immigrants");

  
}

var changeYrIndicator = function(){
  var endYr = 2015;
  var w = (positions.graph.width/100)*ww;
  var x1 = ((100-positions.graph.left)/100)*ww;
  w = Math.floor(w/gridSize)*gridSize;
  x1 = Math.floor(x1/gridSize)*gridSize;

  var x = d3.scaleLinear()
              .domain([startYr, endYr+10])
              .range([x1-w,x1]);

  var xw = x(startYr+10)-x(startYr);
  d3.selectAll(".barYr")
    .style("fill",colors.graphBar);

  d3.select(".barYr_"+selectedYear).style("fill",colors.main);

  d3.select("#yrInd")
     .transition()
     .duration(1000)
     .attr("transform","translate("+(x(selectedYear)-x(startYr)+xw/2+(selectedYear%10 == 0 ? 0 : xw/4))+",0)");
  d3.select(".yrLabel")
                .text( (selectedYear-(selectedYear%10 == 0 ? 10 : 5)) +"--" + (selectedYear-1));
  d3.select(".yrValue")
    .text(numeral(d3.select(".barYr_"+selectedYear).attr("value")).format('0,0') +" total immigrants")

}

var  drawGraph = function() {
  var graph = svg.append("g")
                 .attr("class","yrGraph")
  var h = (positions.graph.height/100)*wh, w = (positions.graph.width/100)*ww;
  var x1 = ((100-positions.graph.left)/100)*ww, y1 = (positions.graph.top/100)*wh;

  //Rounding up to align to grid
  h = Math.floor(h/gridSize)*gridSize;
  w = Math.floor(w/gridSize)*gridSize;
  x1 = Math.floor(x1/gridSize)*gridSize;
  y1 = Math.floor(y1/gridSize)*gridSize;

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
              .domain([startYr, endYr+10])
              .range([x1-w,x1]);
    var y = d3.scaleLinear()
              .domain([max, min-max*.08])
              .range([y1,y1+h]);
    var xw = x(startYr+10)-x(startYr);

    // graph.append("rect")
    //      .attr("x",x(1830))
    //      .attr("y",y(y1))
    //      .attr("width",w)
    //      .attr("height",h)
    //      .style("fill",colors.graphBar)

    for(var i=0;i<data.length;i++){
       graph.append("rect")
             .attr("x",data[i].yr%10 == 0 ? x(data[i].yr) : x(data[i].yr)+xw/2 )
             .attr("y",y(data[i].value))
             .attr("width",data[i].yr%10 == 0 ? xw :xw/2 )
             .attr("height",0)
             .attr("value",data[i].value)
             .attr("class","barYr barYr_"+data[i].yr)
             .attr("yr",data[i].yr)
             .style("fill",colors.graphBar)
             .style("cursor","pointer")
             .style("stroke",colors.squareBorder)
             .on("click",function(){
                changeYr(parseInt($(arguments[2]).attr("yr")))
             })
             .transition()
             .delay(i*50)
             .duration(50)
             .attr("height",h-(y(data[i].value)-y1));
      if(i%3==0)
      graph.append("text")
           .attr("x",x(data[i].yr)+xw)
           .attr("y",y1+h+gridSize*1.5)
           .attr("class","yrLabelSmall")
           .attr("text-anchor","middle")
           .style("fill",colors.main)
           .style("font-size",gridSize)
           .text(data[i].yr);
    }

    var yrInd = graph.append("g")
                     .attr("id","yrInd")
    yrInd.append("line")
         .attr("x1",x(startYr))
         .attr("y1",y1)
         .attr("x2",x(startYr))
         .attr("y2",y1+h)
         .style("stroke-dasharray", ("3, 3")) 
         .style("stroke",colors.graphBar)

    yrInd.append("text")
         .attr("x",x(startYr))
         .attr("y",y1-gridSize/2)
         .attr("text-anchor","middle")
         .text("")
         .style("fill",colors.main)
         .attr("class","yrLabel")

    graph.append("text")
         .attr("x",x(endYr+10))
         .attr("y",y1+h+gridSize*6)
         .attr("text-anchor","end")
         .text("")
         .style("fill",colors.main)
         .attr("class","yrValue");

    
    

  });
}

var drawRegions = function(values){
  var map = svg.append("g")
               .attr("id","map");
  var x = d3.scaleLinear()
         .domain([0, 100])
         .range([ww*(positions.map.left/100), ww*(positions.map.width/100)]);
 var totHt = wh*(positions.map.height/100);
 var y = d3.scaleLinear()
         .domain([0, 100])
         .range([(positions.map.top/100)*wh, (positions.map.top/100)*wh+totHt])
  for(var regi in dummy){
    var region = dummy[regi];
    var x1 = Math.ceil(x(region.left)/gridSize)*gridSize;
    var y1 = Math.ceil(y(region.top)/gridSize)*gridSize;
    var values = region.values;
    var bound =  x(region.left + region.width);
    var reg = map.append("g")
                 .attr("id",regi.replace(/\s/g,"_"));

    //Region name
    reg.append("text")
       .attr("x",x1)
       .attr("y",y1-5)
       .text(regi.replace("_"," "))
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
              .range([ww*(positions.map.left/100), ww*(positions.map.width/100)]);
      var totHt = wh*(positions.map.height/100);
      var y = d3.scaleLinear()
              .domain([0, 100])
              .range([(positions.map.top/100)*wh, (positions.map.top/100)*wh+totHt])

      //Calculating the maximum value one square can have. 
      //This depends on immigrant population of that country and its size.
      sqV=0;
      for(var z=0;z<regions.length;z++){
        var reg = regions[z].key.replace(/\s/g,"_");
        if(dummy[reg]){
          var values2 = regions[z].country.buckets.map(function(cc){
            return parseInt(cc.sum_v.value);
          })
          var sum = values2.reduce(function(a, b) {
                              return a + b;
                            }, 0);
          var rw = x(dummy[reg].width)-x(0), rh = y(dummy[reg].height)-y(0);
          var ns = Math.floor(sum/(rw*rh/(gridSize*gridSize)));
          if(ns>sqV){
            sqV = ns;
          }
        }
      }

      for(var z=0;z<regions.length;z++){
        var reg = regions[z].key.replace(/\s/g,"_");
        if(dummy[reg]){
          var values = regions[z].country.buckets.map(function(cc){
            return {
              "name" : cc.key,
              "value" : cc.sum_v.value,
              "newV": cc.sum_v.value > sqV ?  parseInt(cc.sum_v.value/sqV) : 0.5
            }
          })
          dummy[reg]["values"] = values;
        }
      }
      var totCt = 0;
      for(var regi in dummy){
        var region = dummy[regi];
        var x1 = Math.ceil(x(region.left)/gridSize)*gridSize;
        var y1 = Math.ceil(y(region.top)/gridSize)*gridSize;
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
          var coun = reg.append("g")
              .attr("class","countryOnMap")
              .attr("title",values[i].name+"--"+numeral(values[i].value).format('0,0'))
              .on("click", function(d) {
                  var x =    d3.event.pageX;
                $(".tooltip").removeClass("small big").addClass("small");
                  if(x + .1*ww>ww){
                    x = x - .1*ww;
                  }
                tooltipDiv.transition()    
                      .duration(200)    
                      .style("opacity", .9);    
                tooltipDiv.html($(event.currentTarget).attr("title"))  
                      .style("left", x + "px")   
                      .style("top", (d3.event.pageY - 28) + "px");  
                  })          
              .on("mouseout", function(d) {   
                tooltipDiv.
                      transition()    
                      .duration(50)    
                      .style("opacity", 0) 
                      .style("left", "-1000px");
              });
          for(var j=0;j<(values[i].newV>1 ? values[i].newV : values[i].newV >0 ? 1 : 0);j++){
            //Its like a typewriter, once I reach the end, i set x to the starting position
            // and y to one level down
            //Why the matrix? To draw the boundaries
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
            var isLessThanOneSq = values[i].newV < 1 ? true : false;
            coun.append("rect")
             .attr("x",window.innerWidth/2)
             .attr("y",window.innerHeight)
             .attr("width",isLessThanOneSq ? gridSize/2 : gridSize)
             .attr("height",isLessThanOneSq ? gridSize/2 : gridSize)
             .style("fill",colors.squareFill)
             .style("stroke",colors.squareBorder)
             .attr("class","block")
             .attr("c_id","c_"+i)
             .transition()
             .delay(totCt*(i+1)*50)
             .duration(50)
             .attr("transform", "translate("+(xx+(isLessThanOneSq ? gridSize/4 : 0)-window.innerWidth/2)+","+(yy+(isLessThanOneSq ? gridSize/4 : 0)-window.innerHeight)+")")
            xx += gridSize;
          }
          
        }
        totCt++;
        if(totCt>2){
          totCt=1;
        }
        var countrySep =  reg.append("g")
                             .attr("class","countrySep");

        for(var i=0;i<matrix.length;i++){
          for(var j=0;j<matrix[i].length;j++){

            //When next adjacent column node is different; draw a seperator
            if((j+1< matrix[i].length) && matrix[i][j].id != matrix[i][j+1].id){
              countrySep.append("line")
                 .attr("x1",matrix[i][j+1].x)
                 .attr("y1",matrix[i][j+1].y)
                 .attr("x2",matrix[i][j+1].x)
                 .attr("y2",matrix[i][j+1].y+gridSize)
                 .style("stroke","#F9F9F9")
                 .style("stroke-width",gridSize*.2);
            }
            //When next adjacent row node is different; draw a seperator
            if((i+1< matrix.length) && matrix[i+1][j] && matrix[i][j].id != matrix[i+1][j].id){
              countrySep.append("line")
                 .attr("x1",matrix[i+1][j].x)
                 .attr("y1",matrix[i+1][j].y)
                 .attr("x2",matrix[i+1][j].x+gridSize)
                 .attr("y2",matrix[i+1][j].y)
                 .style("stroke","#F9F9F9")
                 .style("stroke-width",gridSize*.2);
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

setTimeout(function(){
  changeYrIndicator(); 
  renderMap();
  drawLaws();  
},1000)


var changeYr = function(yr){
    selectedYear =yr;
    $(".countryOnMap,.countrySep").remove();
    // d3.selectAll(".block")
    // .transition()
    //  .duration(500)
    //  .attr("transform", "translate(-"+window.innerWidth/2+",-"+window.innerHeight+")");

    $(".keys").empty();
    $(".laws").empty();
    changeYrIndicator(); 
    renderMap();
    drawLaws();
}

// var loop = setInterval(function(){
//   selectedYear += 10;
//   if(selectedYear>=(endYr+10)){
//     clearInterval(loop);
//   }else{
//     if(selectedYear>(endYr)){
//       selectedYear = endYr;
//     }
//     $("#container #map .countryOnMap").remove();
//     $(".keys").empty();
//     $(".laws").empty();
//     changeYrIndicator(); 
//     renderMap();
//     drawLaws();
//   }
// },3000)

// for(var i=0;i<container.length;i++){
// 	var side = (parseInt(Math.random()*10)+1);
// 	svg.append("circle")
// 	   .attr("cx",x(container[i].longitude))
// 	   .attr("cy",y(container[i].latitude))
// 	   .attr("r",side)
// 	   .style("fill","#888888")
// 	   .attr("id",container[i].name);
// }