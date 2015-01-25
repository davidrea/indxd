var createIndex = function() {

	var index = lunr(function() {

		this.field('topic');
		this.ref('_id');

	});
	return index;

};

Template.search.rendered = function () {

	Session.setDefault('search', null);

};

Template.search.helpers({

	search: function() {

		var search = Session.get('search');
		search = (search.length >= 3) ? search : "";
		return search;

	},

	searchResults: function() {
		var index, docs, searchResults;
		var search = Session.get('search');
		var results = [];

		if(search) {

			index = createIndex();
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
