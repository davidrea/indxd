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
			Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
		}

		document.getElementById("inputTopic").select();

	},

	'click .topicbtntitle': function(event) {

		event.preventDefault();
		ga('send', 'event', 'topic', 'edit');
		var newTopic = editTopicPopup(Topics.findOne($(event.target).attr('id')).topic);
		if(newTopic != null) {
			if(newTopic == "") {
				// Empty string - value deleted - delete topic
				Topics.remove($(event.target).attr('id'));
				Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
			} else {
				// New value
				Topics.update($(event.target).attr('id'), {$set: {topic: newTopic, topicsort: newTopic.toLowerCase()}});
				Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
			}
		}

	},

	'click .topicbtnpage': function(event) {

		event.preventDefault();
		ga('send', 'event', 'topic', 'pageedit');
		var newPage = editPagePopup(Topics.findOne($(event.target).attr('id')).topic, Topics.findOne($(event.target).attr('id')).page);
		if(newPage != null) {
			if(newPage == "") {
				// Empty string - value deleted - remove page number
				Topics.update($(event.target).attr('id'), {$set: {page: ""}});
				Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
			} else {
				// New value
				Topics.update($(event.target).attr('id'), {$set: {page: newPage}});
				Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
			}
		}

	},

	'click .topicdel': function(event) {
		event.preventDefault();
		ga('send', 'event', 'topic', 'delete');
		Topics.remove($(event.target).attr('id'));
		Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.lastEdit': new Date() }} );
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

editTopicPopup = function(existing) {

	var newTopic = prompt('Edit topic "' + existing + '":', existing);

	if(newTopic != null) {
		// Entered new topic, which may be empty
		return newTopic;
	} else {
		// Clicked "Cancel"
		return null;
	}

};

editPagePopup = function(existingTopic, existingPage) {

	var newTopic = prompt('Change topic page number "' + existingTopic + '":', existingPage);

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
