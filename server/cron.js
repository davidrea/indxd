SyncedCron.add({
	name: 'Send a weekly index backup to all users',

	schedule: function(parser) {
		return parser.text('at 1:00AM on Sunday');
		//return parser.text('every 10 seconds'); // -=-=- For debugging only
	},

	job: function() {

		var users = Meteor.users.find().fetch();

		_.each(users, function(user, index, list) {

			if(Topics.find({userId: user._id}).count() > 0) {
				Meteor.call('emailIndexBackup', user._id);
			}

		});

	}
});

SyncedCron.start();
