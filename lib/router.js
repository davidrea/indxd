Router.configure({
	trackPageView: true,
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return [Meteor.subscribe('notebooks'), Meteor.subscribe('topics')]; }
});

// Router.route('/(.*)', {name: 'maintenance'});

Router.route('/', {name: 'welcome'});

Router.route('/about', {name: 'about'});

Router.route('/books', {name: 'notebookList'});

Router.route('/topics', {name: 'topicList'});

Router.route('/search', {name: 'search'});

Router.route('/settings', {name: 'userSettings'});

Router.route('/notebooks/:_id', {
	name: 'notebookPage',
	data: function() { return Notebooks.findOne(this.params._id); }
});

Router.route('/notebooks/:_id/edit', {
	name: 'notebookEdit',
	data: function() { return Notebooks.findOne(this.params._id); }
});

Router.route('new', { name: 'newBook' });

var requireLogin = function() {
	if(! Meteor.user()) {
		if(Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

var noBooksReroute = function() {
	if(Notebooks.find().count() == 0) {
		Router.go('newBook');
	} else {
		this.next();
	}
};

Router.onBeforeAction('dataNotFound', {only: 'notebookPage'});
Router.onBeforeAction(requireLogin, {only: ['notebookList', 'topicList', 'search', 'newBook']});
Router.onBeforeAction(noBooksReroute, {only: ['notebookList', 'topicList', 'search']});
