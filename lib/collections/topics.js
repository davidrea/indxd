Topics = new Mongo.Collection('topics');

Topics.allow({
	insert: function(userId, doc) { return !! userId; },
	remove: function(userId, doc) { return !! userId; },
	update: function(userId, doc) { return !! userId; }
});
