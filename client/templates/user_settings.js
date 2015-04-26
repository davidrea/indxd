Template.userSettings.helpers({

	// Each of these helpers populates the respective profile object if it doesn't exist;
	// this ensures the defaults are always reflected

	backupsOn: function() {
		if(Meteor.user().profile.backupsEnabled == null) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsEnabled': true }} );
		}
		return Meteor.user().profile.backupsEnabled;
	},

	backpsWhen: function() {
		if(Meteor.user().profile.backupsAlways == null) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsAlways': false }} );
		}
		return Meteor.user().profile.backupsAlways ? "Every Week" : "Only After Changes";
	},

	emailMember: function() {
		if(Meteor.user().profile.mailingList == null) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': false }} );
		}
		return Meteor.user().profile.mailingList;
	},

	mailchimpInProgress: function() {
		return Session.equals('mailchimpInProgress', true);
	}

});

Template.userSettings.events({

	'click #backup-enable': function(event) {
		if(Meteor.user().profile.backupsEnabled) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsEnabled': false }} );
		} else {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsEnabled': true }} );
		}
	},

	'click #backup-when': function(event) {
		if(Meteor.user().profile.backupsAlways) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsAlways': false }} );
		} else {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsAlways': true }} );
		}
	},

	'click #newsletter-join': function(event) {
		if(Meteor.user().profile.mailingList) {

			Session.set("mailchimpInProgress", true);
			Meteor.call('mailingListUnsubscribe', Meteor.userId(), function(error, result) {

				Session.set("mailchimpInProgress", false);
				if(error) {
					return throwError(error.reason);
				} else {
					Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': false }} );
				}

			});

		} else {

			Session.set("mailchimpInProgress", true);
			Meteor.call('mailingListSubscribe', Meteor.userId(), function(error, result) {

				Session.set("mailchimpInProgress", false);
				if(error) {
					return throwError(error.reason);
				} else {
					Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': true }} );
				}

			});

		}
	},

	'click #delete-account': function(event) {
		if("DELETE" == window.prompt("To delete your account, type out the word DELETE here:", "Seriously, this is PERMANENT!")) {
			Meteor.users.remove( { _id: Meteor.userId() } );
			Router.go('welcome');
		}
	}

});
