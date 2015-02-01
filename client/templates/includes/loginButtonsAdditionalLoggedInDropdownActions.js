Template._loginButtonsLoggedInDropdown.events({

	'click #login-buttons-email-my-backup': function(event) {

		var today = new Date().toString().split(' ').splice(1,3).join(' ');

		var indexstring = 'This is an e-mail backup of your topics from Notebook Index';

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
				topic: regex
			}, {sort: {topic: 1}});

			var count = letterTopics.count();

			if(count > 0) {
				indexstring += '\r\n\r\n' + letter.toUpperCase() + '\r\n';
				_.each(letterTopics.fetch(), function(topicforletter) {
					indexstring += "\r\n" + topicforletter.topic + " ----- " + topicforletter.bookName;
				});
			}
		});

		Meteor.call('sendEmail',
				'dave@daverea.com',
				'app@daverea.com',
				'Notebook Index Backup ' + today,
				indexstring,
				function(error, result) {
					if(error) {
						throwError(error.reason);
					}
					else {
						throwMessage("Index backup has been successfully e-mailed");
					}
				});

	}

});
