SyncedCron.add({
	name: 'Send a weekly index backup to all users',

	schedule: function(parser) {
		return parser.text('at 1:00AM on Sunday');
		//return parser.text('every 10 seconds'); // -=-=- For debugging only
	},

	job: function() {

		var users = Meteor.users.find().fetch();

		_.each(users, function(user, index, list) {

			// First check if the user has topics (don't e-mail an empty index!) and backups enabled
			if((Topics.find({userId: user._id}).count() > 0) && 
			   ((user.profile.backupsEnabled == true) || (user.profile.backupsEnabled == null)
			  ) {
				// Next (TODO) check to see if they've made changes since their last backup,
				// and only want e-mailed backups if there have been changes

				Meteor.call('emailIndexBackup', user._id);
			}

		});

	}
});

SyncedCron.start();
