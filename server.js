// Node Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Link in html and api routes
var apiRoutes = require('./app/routing/api-routes.js');
var htmlRoutes = require('./app/routing/html-routes.js');

// Server Routing Map 
apiRoutes(app); // API route - Must be listed first due to the HTML default catch all "use" route
htmlRoutes(app); // HTML route 

// Start listening on PORT
app.listen(PORT, function() {
    console.log('Friend Finder app is listening on PORT: ' + PORT);
  });
