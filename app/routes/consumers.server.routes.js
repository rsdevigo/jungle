'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var consumers = require('../../app/controllers/consumers.server.controller');

	// Consumers Routes
	app.route('/consumers')
		.get(consumers.list)
		.post(users.requiresLogin, consumers.create);

	app.route('/consumers/:consumerId')
		.get(consumers.read)
		.put(users.requiresLogin, consumers.update)
		.delete(users.requiresLogin, consumers.delete);

	// Finish by binding the Consumer middleware
	app.param('consumerId', consumers.consumerByID);
};
