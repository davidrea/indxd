Template.newBook.events({

	'submit form': function(e) {
	
		e.preventDefault();

		var book = {
			name: $(e.target).find("#inputName").val(),
			startDate: $(e.target).find("#inputStartDate").val(),
			endDate:$(e.target).find("#inputEndDate").val()
		};

console.log('Got name = ' + book.name);

		book._id = Notebooks.insert(book);
		Router.go('notebookPage', book);

	}

});
