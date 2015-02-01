Meteor.methods({

	sendEmail: function(to, from, subject, text) {

		check([to, from, subject, text], [String]);

		this.unblock();

		return Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});

	},

	emailIndexBackup: function(to) {

		check([to], [String]);

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

		return Meteor.call('sendEmail', to, "app@daverea.com", "Your Notebook Index Backup for " + today, indexstring);

	}

});
