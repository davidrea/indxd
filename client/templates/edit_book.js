Template.notebookEdit.events({

	'submit form': function(e) {

		e.preventDefault();

		var currentBookId = this._id;

		var bookProperties = {
			name: $(e.target).find("#inputName").val(),
			startDate: $(e.target).find("#inputStartDate").val(),
			endDate: $(e.target).find("#inputEndDate").val()
		}

		var errors = validateBook(bookProperties);
		if(errors.name || errors.endDate) {
			return Session.set('bookSubmitErrors', errors);
		}

		Notebooks.update(currentBookId, {$set: bookProperties}, function(error) {

			if(error) {
				throwError(error.reason);
			} else {
				Router.go('notebookPage', {_id: currentBookId});
			}
		});
	},

	'click .delete': function(e) {

		e.preventDefault();

		if( confirm("Really delete this book?")) {
			var currentBookId = this._id;
			Notebooks.remove(currentBookId);
			Router.go('notebookList');
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
