console.log('Test');

 var http = require("http");
 let fs = require("fs");
 var parser = require("xml2json");
 
 //create a server object:
//  http
//    .createServer(async function(req, res) {
     let xml_data = fs.readFileSync("data.xml", "utf8");
 
     let results = {
       Wimmera:
         "Partly cloudy.s The chance of a thunderstorm with little or no rainfall in the morning and afternoon. Winds southwesterly 15 to 25 km/h turning southerly 20 to 25 km/h during the day. Overnight temperatures falling to between 14 and 19 with daytime temperatures reaching 25 to 31.",
       "South West":
         "Partly cloudy. Slight (20%) chance of a shower near the Otways in the morning. Near zero chance of rain elsewhere. The chance of a thunderstorm with little or no rainfall in the morning and afternoon. Winds south to southwesterly 15 to 25 km/h. Overnight temperatures falling to around 14 with daytime temperatures reaching between 18 and 24."
     };
 
     var weatherJson = parser.toJson(xml_data, {
       alternateTextNode: "forecastText"
     });
 
     let santizedJsonMod = weatherJson.replace(
        /forecast-period/g,
        "forecastPeriod"
      );
 
     let forecastAreas = JSON.parse(santizedJsonMod).product.forecast.area;
     forecastAreas.forEach(function(area) {
       if (area.type === "location") {
         let forecastPeriods = area.forecastPeriod;
         forecastPeriods.forEach(function(period) {
             if(period.index === "3")
             {
                if(period.text.type === "forecast")
                 console.log(period.text.forecastText);
             }
         });
       }
     });
     
 
     // // var weatherJson = JSON.parse(json);
     // res.write(forecastAreas);
     //res.write(santizedJson);
     console.log("Done!");
     //res.end();
   //})
   //.listen(8080); //the server object listens on port 8080
 