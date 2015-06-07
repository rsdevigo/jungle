'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	kong = require('./kong.server.controller'),
	Api = mongoose.model('Consumer'),
	_ = require('lodash'),
	request = require('request');
/**
 * Create a Api
 */
exports.create = function(req, res) {
	var api = new Api(req.body);
	//api.user = req.user;

	return kong.create('/consumers/', req, res);

	/*api.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(api);
		}
	});*/
};

/**
 * Show the current Api
 */
exports.read = function(req, res) {
	res.json(JSON.parse(req.api));
};

/**
 * Update a Api
 */
exports.update = function(req, res) {
	var api = JSON.parse(req.api);

	req.api = _.extend(api , req.body);
	return kong.update('/consumers/', req, res);

	/*api.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(api);
		}
	});*/
};

/**
 * Delete an Api
 */
exports.delete = function(req, res) {
	req.api = JSON.parse(req.api);
	return kong.remove('/consumers/', req, res);
	/*api.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(api);
		}
	});*/
};

/**
 * List of Apis
 */
exports.list = function(req, res) {
	return kong.list('/consumers/', req, res);
	//res.status(200).jsonp(, req);

	/*Api.find().sort('-created').populate('user', 'displayName').exec(function(err, apis) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(apis);
		}
	});*/
};

/**
 * Api middleware
 */
exports.consumerByID = function(req, res, next, id) {
	kong.read('/consumers/', req, res, id, next);
	/*Api.findById(id).populate('user', 'displayName').exec(function(err, api) {
		if (err) return next(err);
		if (! api) return next(new Error('Failed to load Api ' + id));
		req.api = api ;
		next();
	});*/
};

/**
 * Api authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.api.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
