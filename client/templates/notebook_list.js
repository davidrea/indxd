Template.notebookList.helpers( {

	notebooksOpen: function() {
		return Notebooks.find({endDate: ""}, {sort: {endDate: -1}});
	},

	notebooks: function() {
		return Notebooks.find({endDate: {$ne: ""}}, {sort: {endDate: -1}});
	}

} )
