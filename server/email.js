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

	emailIndexBackup: function(userId) {

		check([userId], [String]);

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
				userId: userId,				
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

		var symregex = new RegExp('^[^a-zA-z]');
		var symtopics = Topics.find({
			userId: userId,
			topic: symregex
		}, {sort: {topic: 1}});

		if(symtopics.count() > 0) {
			indexstring += '\r\n\r\nOther Topics\r\n';
		}

		_.each(symtopics.fetch(), function(element, index, list) {

			indexstring += "\r\n" + element.topic + " ----- " + element.bookName;

		});

		return Meteor.call('sendEmail', Meteor.users.findOne({_id: userId}).emails[0].address, "Indxd.ink <no-reply@indxd.ink>", "Your Indxd Backup for " + today, indexstring);

	}

});
