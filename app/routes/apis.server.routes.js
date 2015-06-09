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
	app.route('/apis/:apiId/plugins')
		.get(apis.pluginList)
		.post(apis.pluginCreate);

	app.route('/apis/:apiId/plugins/:pluginId')
		.get(apis.pluginRead)
		.put(users.requiresLogin, apis.updatePlugin)
		.delete(apis.deletePlugin);

	// Finish by binding the Api middleware
	app.param('apiId', apis.apiByID);
	app.param('pluginId', apis.pluginByID);
};
