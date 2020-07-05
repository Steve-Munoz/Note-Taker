// Dependencies

var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

//setting up the Express app to handle the data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function () {
  console.log("App listening on " + PORT);
});
