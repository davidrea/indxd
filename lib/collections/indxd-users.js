Meteor.users.allow({
	remove: function(userId, doc) { return doc && (userId == doc._id); }
});

Accounts.onCreateUser( function(options, user) {

	// Set default profile entries
	user.profile.backupsEnabled = true;
	user.profile.backupsAlways = false;
	user.profile.mailingList = false;

});
