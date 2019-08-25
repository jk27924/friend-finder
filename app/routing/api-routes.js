var friends = require("../data/friends.js");
var path = require("path");


// Export API routes
module.exports = function(app) {

	// Total json list of friend entries
	app.get("/api/friends", function(req, res) {
		res.json(friends);
    });
    
    // Post request used for survey
    app.post("/api/friends", function(req, res) {
        var friendInput = req.body;

        console.log("\nName: " + friendInput.name + "\nPhoto: " +
        friendInput.photo + "\nScores: " + friendInput.answers);

		friends.push(friendInput);
		convertAnswers(friendInput);
        
        compareFriends(friends, friendInput);

		res.json(friendInput);
    });
}

// New friend object using the name, photo link, and an array of the answers
function newFriend(name, photo, answers) {
	this.name = name;
	this.photo = photo;
	this.answers = answers;
}


function convertAnswers(currentFriend) {
	var current = currentFriend;

	var curAnswers = current.answers; // holds answers

	// converts answers from strings to numbers
	for (i=0; i<curAnswers.length; i++) {
		curAnswers[i] = parseInt(curAnswers[i]);
	}
}

// Function to compare the answers from the list and current input
function compareFriends(allFriends, currentFriend) {
	var curFriend = currentFriend.answers;
	var matchFriend;
	var matchScores = [];
	var matchScore = 0;
	var closestMatch;

	// for each friend (excluding last added)
	for (i=0; i<allFriends.length-1; i++) {
		// store all the scores in an array
		matchFriend = allFriends[i].answers;

		for (j=0; j<matchFriend.length; j++) {

			// the new friend and this friend in the array
			var qScore = Math.abs(curFriend[j] - matchFriend[j]);
			// the total match score is equal to the sum of all qScores
			matchScore += qScore;
		}

		// push this friends matchScore into an array
		matchScores.push(matchScore);
		// reset the matchScore to zero before moving to the next friend
		matchScore = 0;
	}

	// Find lowest score in matchScores array
	var lowestScore = Math.min(...matchScores);

	// find the index of the lowest score
	var matchIndex = matchScores.indexOf(lowestScore);

	// find the friend at this index in the allFriends array
	var bestFriend = allFriends[matchIndex];

	// add a new property to the current friend's object that holds the best match
	currentFriend.bestie = bestFriend;
}