Meteor.publish('notebooks', function() {
	return Notebooks.find({userId: this.userId});
});

Meteor.publish('topics', function() {
	return Topics.find({userId: this.userId});
});
