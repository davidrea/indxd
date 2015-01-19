Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('notebooks'); }
});

Router.route('/', {name: 'notebookList'});

Router.route('/about', {name: 'about'});

Router.route('/notebooks/:_id', {
	name: 'notebookPage',
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
}

Router.onBeforeAction('dataNotFound', {only: 'notebookPage'});
Router.onBeforeAction(requireLogin, {only: 'newBook'});
