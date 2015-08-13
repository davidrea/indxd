Template.search.rendered = function () {

	Session.setDefault('search', '');

};

Template.search.helpers({

	search: function() {

		var search = Session.get('search');
		return search;

	},

	searchReady: function() {
		var search = Session.get('search');
		return (search && search.length >= 3);
	},

	topicSearchResults: function() {
		var index, docs, searchResults;
		var search = Session.get('search');
		var results = [];
		var list = [];

		if(search && search.length >= 3) {

			index = lunr(function() {
					this.field('topic');
					this.ref('_id');
				});
			docs = Topics.find({}, {sort: {bookName: 1}}).fetch();
			_.each(docs, function(topic) {
				index.add(topic);
			});

			searchResults = index.search(search);

			_.each(searchResults, function(searchResult) {
				if(searchResult.score > 0) {
					results.push(_.findWhere(docs, {_id: searchResult.ref}));
				}
			});

			// Collapse redundant topics
			var uniqTopicNames = _.uniq(_.sortBy(results, 'topic').map(function(x) {return x.topic;}), true);
			_.each(uniqTopicNames, function(topicName) {
				var topic = {};
				topic.topic = topicName;
				topic.bookList = [];
				topic.bookCount = 0;
				topic.multipleBooks = 0;
				var topics = _.where(docs, {topic: topicName});
				if(topics.length > 1) { topic.multipleBooks = 1; }
				_.each(topics, function(thetopic, index, list) {
					topic.bookCount += 1;
					var book = {};
					book.referringTopic = topicName;
					book.bookName = thetopic.bookName;
					book.bookId = thetopic.bookId;
					book.bookPage = thetopic.page;
					topic.bookList.push(book);
				});
				list.push(topic);
			});
		}

		return list;
	},

	notebookSearchResults: function() {
		var index, docs, searchResults;
		var search = Session.get('search');
		var results = [];

		if(search && search.length >= 3) {

			index = lunr(function() {
					this.field('name');
					this.ref('_id');
				});
			docs = Notebooks.find().fetch();
			_.each(docs, function(notebook) {
				index.add(notebook);
			});

			searchResults = index.search(search);

			_.each(searchResults, function(searchResult) {
				if(searchResult.score > 0) {
					results.push(_.findWhere(docs, {_id: searchResult.ref}));
				}

			});
		}

		return results;
	}

});

Template.search.events({

	'keyup #search, change #search': function(event) {

		event.preventDefault();
		var search;
		search = event.target.value;
		Session.set('search', search);

	},

	'submit form': function(event) {

		event.preventDefault();

	}

});
