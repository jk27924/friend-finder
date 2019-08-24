var friends = require("../data/friends.js");


// Export API routes
module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	// Total json list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
    });
    
    // Post request used for survey
    app.post("/api/friends", function(req, res) {
        var friendInput = req.body;
        // var userResponses = userInput.scores;
        res.json(true);

        console.log("\nName: " + friendInput.name + "\nPhoto: " +
        friendInput.photo + "\nScores: " + friendInput.answers);
    });
}

// Constructor function for builiding friend objects using the
// name, photo link, and an array of the answers
function NewFriend(name, photo, answers) {
	this.name = name;
	this.photo = photo;
	this.answers = answers;
}
