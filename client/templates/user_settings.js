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
		/* if(Meteor.user().profile.backupsAlways == null) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.backupsAlways': false }} );
		}
		return Meteor.user().profile.backupsAlways ? "Every Week" : "After Changes"; */
		return "Coming Soon!";
	},

	emailMember: function() {
		if(Meteor.user().profile.mailingList == null) {
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': false }} );
		}
		return Meteor.user().profile.mailingList;
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
			// TODO Add user to Mailchimp list
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': false }} );
		} else {
			// TODO Remove user from Mailchimp list
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': true }} );
		}
	},

	'click #delete-account': function(event) {
		if("DELETE" == window.prompt("To delete your account, enter DELETE here:", "Seriously, this is PERMANENT!")) {
			Meteor.users.remove( { _id: Meteor.userId() } );
			Router.go('welcome');
		}
	}

});
