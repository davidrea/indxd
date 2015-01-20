Topics = new Mongo.Collection('topics');

Topics.allow({
	insert: function(userId, doc) { return !! userId; }
});
