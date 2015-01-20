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

		if(Topics.findOne({topic: topic.topic, bookId: topic.bookId, page: topic.page})) {
			throwError("This topic already exists for this book");
		} else {
			Topics.insert(topic);
		}

	},

	'dblclick .topicbtn': function(event) {
		Topics.remove($(event.target).attr('id'));
	}

});

Template.notebookPage.helpers({

	topics: function() {
		return Topics.find({bookId: Template.instance().data._id}, {sort: {topicsort: 1}});
	},

	hastopics: function() {
		return Topics.find({bookId: Template.instance().data._id}).count();
	}

});
