Meteor.methods({

	sendEmail: function(to, from, subject, text) {

		check([to, from, subject, text], [String]);

		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});

	}

});
