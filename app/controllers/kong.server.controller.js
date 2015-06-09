'use strict';
/**
 * Get the error message from error object
 */
var config = require('../../config/config'),
	request = require('request'),
	_ = require('lodash');


exports.list = function(endpoint, req, res) {
	var params = '?';
	_.each(req.query, function(value, key){
		params += key+'='+value+'&';
	});
	console.log(config.app.kongUrl+endpoint+params);
	request(config.app.kongUrl+endpoint+params, function(error, response, body){
		if (response.statusCode === 200) {
			return res.status(200).jsonp(JSON.parse(body).data);
		} else {
			return res.status(response.statusCode).jsonp(JSON.parse(body));
		}
	});
};

exports.create = function(endpoint, req, res) {
	var data = req.body;

	request.post({url:config.app.kongUrl+endpoint, form: data}, function(error, response, body){
		if (response.statusCode === 201) {
			return res.status(201).json(JSON.parse(body));
		} else {
			return res.status(response.statusCode).jsonp(body);
		}
	});

};

exports.read = function(endpoint, req, res, id, next) {
	return request(config.app.kongUrl+endpoint+id, function(error, response, body){
		req.entity = body;
		next();
	});
};

exports.update = function(endpoint, req, res) {
	return request.patch({url: config.app.kongUrl+endpoint+req.entity.id, form: req.entity}, function(error, response, body){
		if (response.statusCode === 200) {
			return res.status(200).json(JSON.parse(body));
		} else {
			return res.status(response.statusCode).json(JSON.parse(body));
		}
	});
};

exports.remove = function(endpoint, req, res) {
	return request.del(config.app.kongUrl+endpoint+req.entity.id, function(error, response, body){
		if (response.statusCode === 204) {
			return res.status(204).send();
		} else {
			return res.status(response.statusCode).json(JSON.parse(body));
		}
	});
};