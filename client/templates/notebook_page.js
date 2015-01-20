Template.notebookPage.events({

	'submit form': function(e, template) {

		e.preventDefault();

		var topic = {
			topic: $(e.target).find("#inputTopic").val(),
			topicsort: $(e.target).find("#inputTopic").val().toLowerCase(),
			page: $(e.target).find("#inputPage").val(),
			bookId: template.data._id,
			userId: this.userId
		};

		Topics.insert(topic);

	}

});

Template.notebookPage.helpers({

	topics: function() {
		return Topics.find({bookId: Template.instance().data._id}, {sort: {topicsort: 1}});
	}

});
