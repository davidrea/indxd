Template.newBook.events({

	'submit form': function(e) {
	
		e.preventDefault();

		var book = {
			name: $(e.target).find("#inputName").val(),
			startDate: $(e.target).find("#inputStartDate").val(),
			endDate:$(e.target).find("#inputEndDate").val()
		};

		var errors = validateBook(book);
		if(errors.name || errors.endDate) {
			return Session.set('bookSubmitErrors', errors);
		}

		Meteor.call('bookInsert', book, function(error, result) {

			if(error) {
				return throwError(error.reason);
			}
			ga('send', 'event', 'book', 'create');
			Router.go('notebookPage', {_id: result._id});

		});

	}

});

Template.newBook.created = function() {
	Session.set('bookSubmitErrors', {});
}

Template.newBook.helpers({

	errorMessage: function(field) {
		return Session.get('bookSubmitErrors')[field];
	},

	errorClass: function(field) {
		return Session.get('bookSubmitErrors')[field] ? 'has-error' : '';
	},

	hasBooks: function() {
		return Notebooks.find().count();
	}

});
