'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Consumer Schema
 */
var ConsumerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Consumer name',
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

mongoose.model('Consumer', ConsumerSchema);