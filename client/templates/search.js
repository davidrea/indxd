Template.search.rendered = function () {

	Session.setDefault('search', null);

};

Template.search.helpers({

	search: function() {

		var search = Session.get('search');
		return search;

	},

	searchReady: function() {
		var search = Session.get('search');
		return (search.length >= 3);
	},

	topicSearchResults: function() {
		var index, docs, searchResults;
		var search = Session.get('search');
		var results = [];

		if(search.length >= 3) {

			index = lunr(function() {
					this.field('topic');
					this.ref('_id');
				});
			docs = Topics.find().fetch();
			_.each(docs, function(topic) {
				index.add(topic);
			});

			searchResults = index.search(search);

			_.each(searchResults, function(searchResult) {
				if(searchResult.score > 0) {
					results.push(_.findWhere(docs, {_id: searchResult.ref}));
				}

			});
		}

		return results;
	},

	notebookSearchResults: function() {
		var index, docs, searchResults;
		var search = Session.get('search');
		var results = [];

		if(search.length >= 3) {

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
