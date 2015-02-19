Hooks.init();

Hooks.onLoggedIn = function() {
	ga('send', 'event', 'user', 'logged-in');
	Router.go('notebookList');
}

Hooks.onLoggedOut = function(userid) {
	check(userid, String);
	ga('send', 'event', 'user', 'logged-out');
	Router.go('welcome');
}

Hooks.onCreateUser = function(userid) {
	check(userid, String);
	ga('send', 'event', 'user', 'created');
	ga('send', 'event', 'user', 'logged-in');
}
