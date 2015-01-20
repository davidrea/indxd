Meteor.publish('notebooks', function() {
	return Notebooks.find();
});

Meteor.publish('topics', function() {
	return Topics.find({userId: this.userId});
});
