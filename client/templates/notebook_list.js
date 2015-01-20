Template.notebookList.helpers( {

	notebooks: function() {
		return Notebooks.find({}, {sort: {endDate: -1}});
	}

} )
