Template.topicList.helpers({

	letters: function() {

		var topics = Topics.find({userId: Meteor.userId()}).fetch();
		var letterchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var letterarray = letterchars.split("");
		var letters = new Array();
		letterarray.reduce(function(o, v, i) {
			letters[i] = {letter: v};
			return o;
		}, {});

		_.each(letters, function(element, index, list) {

			var letter = list[index].letter.toLowerCase();
			var regex = new RegExp('^' + letter, 'i');

			// Determine if there are topics for this letter
			var letterTopics = Topics.find({
				userId: Meteor.userId(), 
				topic: regex
			}, {sort: {topic: 1}});

			var count = letterTopics.count();

			if(count > 0) {
				letters[index].hasTopics = true;
			}

			// Populate the list of topics
			letters[index].topicsForLetter = letterTopics;
		});
		
		return letters;
	},

	topicTotal: function() {
		return Topics.find({userId: Meteor.userId()}).count();
	}

});
