Template.topicList.helpers({

	letters: function() {

		var letterchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var letterarray = letterchars.split("");
		var letters = new Array();
		letterarray.reduce(function(o, v, i) {
			letters[i] = {letter: v};
			return o;
		}, {});

		_.each(letters, function(element, letterindex, list) {

			var letter = list[letterindex].letter.toLowerCase();
			var regex = new RegExp('^' + letter, 'i');

			// Determine if there are topics for this letter
			var letterTopicNames = _.uniq(Topics.find(
				{topic: regex},
				{
					sort: {topic: 1},
					fields: {topic: true}
				}).fetch().map(function(x) {
					return x.topic;
				}), true);

			var count = letterTopicNames.length;

			// Create list of topics

			if(count > 0) {
				letters[letterindex].hasTopics = true;
				letters[letterindex].topicsForLetter = [];

				// Get topic content for each name
				_.each(letterTopicNames, function(topicName, index, list) {
					var topic = {};
					topic.topic = topicName;
					topic.uid = _.uniqueId();
					topic.bookList = [];
					topic.bookCount = 0;
					topic.multipleBooks = 0;
					var topics = Topics.find({topic: topicName}, {sort: {bookName: 1}});
					if(topics.count() > 1) { topic.multipleBooks = 1; }
					_.each(topics.fetch(), function(thetopic, index, list) {
						topic.bookCount += 1;
						var book = {};
						book.referringTopic = topicName;
						book.bookName = thetopic.bookName;
						book.bookId = thetopic.bookId;
						book.bookPage = thetopic.page;
						topic.bookList.push(book);
					});
					letters[letterindex].topicsForLetter.push(topic);
				});
			}
		});

		return letters;
	},

	others: function() {

		var regex = new RegExp('^[^a-zA-z]');
		return Topics.find({topic: regex});

	}

});

Template.registerHelper('topicTotal', function() {
	return Topics.find({userId: Meteor.userId()}).count();
});
