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

		Meteor.users.update( { _id: user._id }, { $set: { 'profile.lastEdit': new Date() }} );
		var bookId = Notebooks.insert(book);
		return { _id: bookId };

	},

	bookUpdate: function(bookId, bookAttributes) {

		check(Meteor.userId(), String);
		check(bookId, String);
		check(bookAttributes, {
			name: String,
			startDate: String,
			endDate: String,
			url: String
		});

		Notebooks.update(bookId, {$set: bookAttributes}, function(error) {

			if(error) {
				throwError(error.reason);
			} else {
				// Update all topics with this book ID (denormalized data)
				Topics.update({bookId: bookId}, { $set: {bookName: bookAttributes.name} }, {multi: true}, function(error, count) {
					if(error != null) {
						throwError(error.reason);
					} else {
						Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
					}
				});
			}
		});

	},

	bookDelete: function(bookId) {

		check(bookId, String);

		if(Notebooks.findOne({_id: bookId})) {
			Notebooks.remove(bookId);
			Topics.remove({bookId: bookId});
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
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
