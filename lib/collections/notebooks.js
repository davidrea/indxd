Notebooks = new Mongo.Collection('notebooks');

Notebooks.allow({

	update: function(userId, doc) { return ownsDocument(userId, doc); },
	remove: function(userId, doc) { return ownsDocument(userId, doc); },

});

Meteor.methods({

	bookInsert: function(bookAttributes) {

		check(Meteor.userId(), String);
		check(bookAttributes, {
			name: String,
			startDate: String,
			endDate: String
		});

		var user = Meteor.user();
		var book = _.extend(bookAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});
		var bookId = Notebooks.insert(book);
		return { _id: bookId };

	}

});
