var fs = require('fs');
var csv = require('csv');
var parser = csv.parse({delimiter: ','}, function(err, data){
  var obj = {};
  for(var i=1;i<data.length;i++){
    console.log(data[i][0] + "--" + data[i][1]);
    if(parseInt(data[i][0])){
      obj[parseInt(data[i][0])] = {
        "title" : data[i][1],
        "desc" : data[i][2],
      }
    }
  }
  fs.writeFileSync("imm_laws.json",JSON.stringify(obj));  
});


fs.createReadStream('Immigration Laws.csv').pipe(parser);