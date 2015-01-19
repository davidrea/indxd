Template.nav.helpers( {

	isActiveLink: function(path) {
		
		if(Router.current().route.getName() === path) {
			return {'class': "active"};
		}

	}

} )
