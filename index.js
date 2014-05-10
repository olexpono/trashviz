var config = require("./config")();
var express = require("express");
var ejs   = require("ejs");
var path = require("path");
var fs = require("fs");

var _ = require('lodash-node');

var app = express();

app.use(express.static(path.join(config.root, "public")));
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

var landfills_string;
var landfills_data;

fs.readFile("landfills.geojson", "utf8", function(err, data) {
  if (err) { console.log(err); }
  var theData = JSON.parse(data)["features"];
  landfills_data = 
    _.unique( _.sortBy(theData, function(feature) {
    return feature["properties"]["area"][0]["area"];
  }).reverse(),/* _.unique(arr, */ function(feature) {
    return feature["properties"]["Facility_Street"];
  });
  landfills_string = JSON.stringify(landfills_data);
});

app.post("/refresh_data", function(req, res) {
  // Pull in json from http://crowdcrafting.org/app/landfill/tasks/export?type=task_run&format=json
  // Run through python area thingy
  // Update local copy of landfills.json (DB)
});

app.get("/landfills.json", function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write(landfills_string);
  res.end();
});
/* Homepage */
app.get("/", function(req, res) {
  res.render("index", {
    landfills: landfills_data
  }, function(err, html) {
    res.end(html);
  });
});

console.log("Starting app trashviz on port ", config.port);
app.listen(config.port);
