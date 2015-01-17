Meteor.publish('notebooks', function() {

	return Notebooks.find();

});
