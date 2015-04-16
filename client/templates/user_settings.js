Template.userSettings.helpers({

	backupsOn: function() {
		return Meteor.user().profile.backupsEnabled;
	},

	backpsWhen: function() {
		return Meteor.user().profile.backupsAlways ? "Every Week" : "After Changes";
	},

	emailMember: function() {
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
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.mailingList': false }} );
		} else {
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
