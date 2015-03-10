Template.notebook.helpers({

	topicCount: function() {

		return Topics.find({bookId: this._id}).count();

	},

	url_shortened: function() {
		if(this.url.length <= 30) {
			return this.url;
		} else {
			return this.url.substring(0, 30) + "...";
		}
	}

});
