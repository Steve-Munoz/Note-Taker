// Dependencies

var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

//setting up the Express app to handle the data parsing

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//points to our server which is a series of routes and will respond when users sist or request data from different pages
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
  //   console.log("App listening on " + PORT);
  console.log("Server listening on: http://localhost:" + PORT);
});
