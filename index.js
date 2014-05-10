var config = require("./config")();
var express = require("express");
var ejs   = require("ejs");
var path = require("path");

var app = express();

app.use(express.static(path.join(config.root, "public")));
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

var quotes = {
  "Cecilia Payne": "If you are sure of your facts, you should defend your position",
  "Thoreau": "There are a thousand hacking at the branches of evil to one who is striking at the root"
}

/* Homepage */
app.get("/", function(req, res) {
  res.render("index", {
    quotes: quotes
  }, function(err, html) {
    res.end(html);
  });
});

console.log("Starting app trashviz on port ", config.port);
app.listen(config.port);
