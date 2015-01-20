Template.newBook.events({

	'submit form': function(e) {
	
		e.preventDefault();

		var book = {
			name: $(e.target).find("#inputName").val(),
			startDate: $(e.target).find("#inputStartDate").val(),
			endDate:$(e.target).find("#inputEndDate").val()
		};

		Meteor.call('bookInsert', book, function(error, result) {

			if(error) {
				return alert(error.reason);
			}
			Router.go('notebookPage', {_id: result._id});

		});

	}

});
