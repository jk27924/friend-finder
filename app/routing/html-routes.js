// ***** DEPENDENCIES *****
var path = require("path");

// ***** ROUTES *****
module.exports = function(app){

	// ---- Displays the home page ----
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/home.html"));
	});

	// ---- Displays the survey page ----
	app.get("/survey", function(req, res) {
	  res.sendFile(path.join(__dirname, "../public/survey.html"));
	});
}