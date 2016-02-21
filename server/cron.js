SyncedCron.add({
	name: 'Send a weekly index backup to all users',

	schedule: function(parser) {
		return parser.text('at 1:00AM on Sunday');
		//return parser.text('every 10 seconds'); // -=-=- For debugging only
	},

	job: function() {

		var users = Meteor.users.find().fetch();
		var dobackup = true;

		_.each(users, function(user, index, list) {

			// First check if the user has topics (don't e-mail an empty index!) and backups enabled
			if((Topics.find({userId: user._id}).count() > 0) && 
			   ((user.profile.backupsEnabled == true) || (user.profile.backupsEnabled == null))
			  ) {
				// Check to see if the user has made edits since their last backup ran
				if(user.profile.lastEdit && user.profile.lastBackup && (user.profile.lastEdit < user.profile.lastBackup)) {
					dobackup = false;
				}

				// Check to see if the user has overridden smart backups
				if(user.profile.backupsAlways) {
					dobackup = true;
				}

				if(dobackup) {
					Meteor.call('emailIndexBackup', user._id);
					Meteor.users.update( { _id: user._id }, { $set: { 'profile.lastBackup': new Date() }} );
				}
			}

		});

	}
});

SyncedCron.start();
