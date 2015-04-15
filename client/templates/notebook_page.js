Template.notebookPage.events({

	'submit form': function(e, template) {

		e.preventDefault();

		var topic = {
			topic: $(e.target).find("#inputTopic").val(),
			topicsort: $(e.target).find("#inputTopic").val().toLowerCase(),
			page: $(e.target).find("#inputPage").val(),
			bookId: template.data._id,
			bookName: template.data.name,
			userId: this.userId
		};

		if(Topics.findOne({topic: topic.topic, bookId: topic.bookId, page: topic.page})) {
			throwError("This topic already exists for this book");
		} else {
			ga('send', 'event', 'topic', 'add');
			Topics.insert(topic);
		}

		document.getElementById("inputTopic").select();

	},

	'dblclick .topicbtntitle': function(event) {
	},

	'click .topicbtntitle': function(event) {

		event.preventDefault();
		ga('send', 'event', 'topic', 'edit');
		var newTopic = editPopup(Topics.findOne($(event.target).attr('id')).topic);
		if(newTopic != null) {
			if(newTopic == "") {
				// Empty string - topic value deleted - delete topic
				Topics.remove($(event.target).attr('id'));
			} else {
				// New value
				Topics.update($(event.target).attr('id'), {$set: {topic: newTopic, topicsort: newTopic.toLowerCase()}});
			}
		}

	},

	'click .topicdel': function(event) {
		event.preventDefault();
		ga('send', 'event', 'topic', 'delete');
		Topics.remove($(event.target).attr('id'));
	}

});

Template.notebookPage.rendered = function() {
		document.getElementById("inputTopic").focus();
};

Template.notebookPage.helpers({

	topics: function() {
		return Topics.find({bookId: Template.instance().data._id}, {sort: {topicsort: 1}});
	},

	hastopics: function() {
		return Topics.find({bookId: Template.instance().data._id}).count();
	},

	distinctTopics: function() {
		return Topics.find().fetch().map(function(it) { return it.topic; });
	}

});

editPopup = function(existing) {

	var newTopic = prompt('Edit topic "' + existing + '":', existing);

	if(newTopic != null) {
		// Entered new topic, which may be empty
		return newTopic;
	} else {
		// Clicked "Cancel"
		return null;
	}

};

Template.notebookPage.rendered = function() {
  Meteor.typeahead.inject();
};
