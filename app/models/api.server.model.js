'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Api Schema
 */
var ApiSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Api name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Api', ApiSchema);