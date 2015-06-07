'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var apis = require('../../app/controllers/apis.server.controller');

	// Apis Routes
	app.route('/apis')
		.get(apis.list)
		.post(users.requiresLogin, apis.create);

	app.route('/apis/:apiId')
		.get(apis.read)
		.put(users.requiresLogin, apis.update)
		.delete(users.requiresLogin, apis.delete);

	// Finish by binding the Api middleware
	app.param('apiId', apis.apiByID);
};
