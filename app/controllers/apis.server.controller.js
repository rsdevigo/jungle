'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	kong = require('./kong.server.controller'),
	Api = mongoose.model('Api'),
	_ = require('lodash'),
	request = require('request');
/**
 * Create a Api
 */
exports.create = function(req, res) {
	var api = new Api(req.body);
	//api.user = req.user;

	return kong.create('/apis/', req, res);

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
	res.json(JSON.parse(req.entity));
};

/**
 * Update a Api
 */
exports.update = function(req, res) {
	var entity = JSON.parse(req.entity);

	req.entity = _.extend(entity , req.body);
	return kong.update('/apis/', req, res);

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
	req.entity = JSON.parse(req.entity);
	return kong.remove('/apis/', req, res);
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
	return kong.list('/apis/', req, res);
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
exports.apiByID = function(req, res, next, id) {
	kong.read('/apis/', req, res, id, next);
	/*Api.findById(id).populate('user', 'displayName').exec(function(err, api) {
		if (err) return next(err);
		if (! api) return next(new Error('Failed to load Api ' + id));
		req.api = api ;
		next();
	});*/
};

exports.pluginByID = function(req, res, next, id) {
	kong.read('/plugins_configurations/', req, res, id, next);
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


exports.pluginList = function(req, res) {
	req.entity = JSON.parse(req.entity);
	return kong.list('/apis/'+req.entity.id+'/plugins', req, res);
};

exports.pluginCreate = function(req, res) {
	return kong.create('/apis/'+req.body.api_id+'/plugins', req, res);
};

exports.pluginRead = function(req, res) {
	res.json(JSON.parse(req.entity));
};

/**
 * Update a Api
 */
exports.updatePlugin = function(req, res) {
	var entity = JSON.parse(req.entity);

	req.entity = _.extend(entity , req.body);
	return kong.update('/apis/'+entity.api_id+'/plugins/'+entity.id, req, res);

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
exports.deletePlugin = function(req, res) {
	req.entity = JSON.parse(req.entity);
	return kong.remove('/apis/'+req.entity.api_id+'/plugins/', req, res);
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