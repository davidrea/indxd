Notebooks = new Mongo.Collection('notebooks');

Notebooks.allow({

	insert: function(userId, doc) {

		return !! userId;

	}

});
