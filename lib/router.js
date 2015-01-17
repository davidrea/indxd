Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('notebooks'); }
});

Router.route('/', {name: 'notebookList'});
Router.route('/about', {name: 'about'});

Router.route('/notebooks/:_id', {
	name: 'notebookPage',
	data: function() { return Notebooks.findOne(this.params._id); }
});
