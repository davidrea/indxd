Errors = new Mongo.Collection(null);
Messages = new Mongo.Collection(null);

throwError = function(message) {

	Errors.insert({message: message});

};

Template.errors.helpers({

	errors: function() {
		return Errors.find();
	},

	messages: function() {
		return Messages.find();
	}

});

throwMessage = function(message) {

	Messages.insert({message: message});

};
