Meteor.users.allow({
	remove: function(userId, doc) { return doc && (userId == doc._id); }
});
