Template.notebookEdit.events({

	'submit form': function(e) {

		e.preventDefault();

		var currentBookId = this._id;

		var bookProperties = {
			name: $(e.target).find("#inputName").val(),
			startDate: $(e.target).find("#inputStartDate").val(),
			endDate: $(e.target).find("#inputEndDate").val()
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
