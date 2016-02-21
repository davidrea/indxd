Template.notebookEdit.events({

	'submit form': function(e) {

		e.preventDefault();

		var currentBookId = this._id;

		var bookProperties = {
			name: $(e.target).find("#inputName").val(),
			startDate: $(e.target).find("#inputStartDate").val(),
			endDate: $(e.target).find("#inputEndDate").val(),
			url: $(e.target).find("#inputUrl").val()
		}

		var errors = validateBook(bookProperties);
		if(errors.name || errors.endDate) {
			return Session.set('bookSubmitErrors', errors);
		}

		Meteor.call('bookUpdate', currentBookId, bookProperties, function(error, result) {

			if(error) {
				return throwError(error.reason);
			} else {
				ga('send', 'event', 'book', 'edit');
				Router.go('notebookPage', {_id: currentBookId});
			}

		});
	},

	'click .delete': function(e) {

		e.preventDefault();

		if( confirm("Really delete this book and all its topics?!")) {
			Meteor.call('bookDelete', this._id, function(error, result) {
				if(error) {
					return throwError(error.reason);
				} 
				ga('send', 'event', 'book', 'delete');
				Router.go('notebookList');
			});
		}

	}

});

Template.notebookEdit.created = function() {
	Session.set('bookSubmitErrors', {});
}

Template.notebookEdit.helpers({

	errorMessage: function(field) {
		return Session.get('bookSubmitErrors')[field];
	},

	errorClass: function(field) {
		return Session.get('bookSubmitErrors')[field] ? 'has-error' : '';
	}

});
