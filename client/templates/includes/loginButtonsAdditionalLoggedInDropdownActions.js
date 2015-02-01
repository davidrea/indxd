Template._loginButtonsLoggedInDropdown.events({

	'click #login-buttons-email-my-backup': function(event) {

		Meteor.call('emailIndexBackup', Meteor.user().emails[0].address, function(error, result) {
			if(error) {
				throwError(error.reason);
			}
			else {
				throwMessage("Index backup has been successfully e-mailed");
			}
		});

	}

});
