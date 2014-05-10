var config = require("./config")();
var express = require("express");
var ejs   = require("ejs");
var path = require("path");
var fs = require("fs");

var app = express();

app.use(express.static(path.join(config.root, "public")));
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

var landfills_string;
var landfills_data;

fs.readFile("landfills.geojson", "utf8", function(err, data) {
  if (err) { console.log(err); }
  landfill_string = data;
  landfills_data = JSON.parse(data);
});

app.get("/landfills.json", function(req, res) {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.write("{}");
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
