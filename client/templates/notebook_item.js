Template.notebook.helpers({

	topicCount: function() {

		return Topics.find({bookId: this._id}).count();

	}

});
