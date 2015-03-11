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
			endDate: String,
			url: String
		});

		var user = Meteor.user();
		var book = _.extend(bookAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var bookId = Notebooks.insert(book);
		return { _id: bookId };

	},

	bookDelete: function(bookId) {

		check(bookId, String);

		if(Notebooks.findOne({_id: bookId})) {
			Notebooks.remove(bookId);
			Topics.remove({bookId: bookId});
			return 1;
		}
		return 0;

	}

});

validateBook = function(book) {

	var errors = {};

	if(!book.name) {
		errors.name = "Please enter a name for this book";
	}

	if(book.endDate && (book.endDate < book.startDate)) {
		errors.endDate = "A book can't end before it was started!";
	}

	return errors;

}
