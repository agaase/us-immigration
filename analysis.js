var fs = require('fs');
var csv = require('csv');
var yrWiseJson = {};

var parser = csv.parse({delimiter: ','}, function(err, data){

  var min = 1000000000, max = 0, ctPerYear={}, valuesCtYr={}, oneCount = {};
  for(var i=2;i<data.length;i++){
   if(data[i][0].indexOf("region") ==-1){
    for(var z=1;z<data[i].length;z++){
      var val = parseInt(data[i][z].replace(/[,]/g,""));   
      if(val < min){
         min = val;
      }
      if(val>max){
         max = val;
      }
      if(val > 5000){
         ctPerYear[data[0][z]] = ctPerYear[data[0][z]] || 0;
         ctPerYear[data[0][z]]++;
      }
      if(val>0){
         valuesCtYr[data[0][z]] = valuesCtYr[data[0][z]] || 0;
         valuesCtYr[data[0][z]]++;
      }
      oneCount[data[0][z]] = ctPerYear[data[0][z]] +"("+valuesCtYr[data[0][z]]+")";
    }
   }
  }
  console.log(min + "-" + max + "---");
  console.log(oneCount);
});


fs.createReadStream('data/immigration.csv').pipe(parser);
