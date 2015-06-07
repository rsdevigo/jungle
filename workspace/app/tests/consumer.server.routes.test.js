'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Consumer = mongoose.model('Consumer'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, consumer;

/**
 * Consumer routes tests
 */
describe('Consumer CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Consumer
		user.save(function() {
			consumer = {
				name: 'Consumer Name'
			};

			done();
		});
	});

	it('should be able to save Consumer instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Consumer
				agent.post('/consumers')
					.send(consumer)
					.expect(200)
					.end(function(consumerSaveErr, consumerSaveRes) {
						// Handle Consumer save error
						if (consumerSaveErr) done(consumerSaveErr);

						// Get a list of Consumers
						agent.get('/consumers')
							.end(function(consumersGetErr, consumersGetRes) {
								// Handle Consumer save error
								if (consumersGetErr) done(consumersGetErr);

								// Get Consumers list
								var consumers = consumersGetRes.body;

								// Set assertions
								(consumers[0].user._id).should.equal(userId);
								(consumers[0].name).should.match('Consumer Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Consumer instance if not logged in', function(done) {
		agent.post('/consumers')
			.send(consumer)
			.expect(401)
			.end(function(consumerSaveErr, consumerSaveRes) {
				// Call the assertion callback
				done(consumerSaveErr);
			});
	});

	it('should not be able to save Consumer instance if no name is provided', function(done) {
		// Invalidate name field
		consumer.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Consumer
				agent.post('/consumers')
					.send(consumer)
					.expect(400)
					.end(function(consumerSaveErr, consumerSaveRes) {
						// Set message assertion
						(consumerSaveRes.body.message).should.match('Please fill Consumer name');
						
						// Handle Consumer save error
						done(consumerSaveErr);
					});
			});
	});

	it('should be able to update Consumer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Consumer
				agent.post('/consumers')
					.send(consumer)
					.expect(200)
					.end(function(consumerSaveErr, consumerSaveRes) {
						// Handle Consumer save error
						if (consumerSaveErr) done(consumerSaveErr);

						// Update Consumer name
						consumer.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Consumer
						agent.put('/consumers/' + consumerSaveRes.body._id)
							.send(consumer)
							.expect(200)
							.end(function(consumerUpdateErr, consumerUpdateRes) {
								// Handle Consumer update error
								if (consumerUpdateErr) done(consumerUpdateErr);

								// Set assertions
								(consumerUpdateRes.body._id).should.equal(consumerSaveRes.body._id);
								(consumerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Consumers if not signed in', function(done) {
		// Create new Consumer model instance
		var consumerObj = new Consumer(consumer);

		// Save the Consumer
		consumerObj.save(function() {
			// Request Consumers
			request(app).get('/consumers')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Consumer if not signed in', function(done) {
		// Create new Consumer model instance
		var consumerObj = new Consumer(consumer);

		// Save the Consumer
		consumerObj.save(function() {
			request(app).get('/consumers/' + consumerObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', consumer.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Consumer instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Consumer
				agent.post('/consumers')
					.send(consumer)
					.expect(200)
					.end(function(consumerSaveErr, consumerSaveRes) {
						// Handle Consumer save error
						if (consumerSaveErr) done(consumerSaveErr);

						// Delete existing Consumer
						agent.delete('/consumers/' + consumerSaveRes.body._id)
							.send(consumer)
							.expect(200)
							.end(function(consumerDeleteErr, consumerDeleteRes) {
								// Handle Consumer error error
								if (consumerDeleteErr) done(consumerDeleteErr);

								// Set assertions
								(consumerDeleteRes.body._id).should.equal(consumerSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Consumer instance if not signed in', function(done) {
		// Set Consumer user 
		consumer.user = user;

		// Create new Consumer model instance
		var consumerObj = new Consumer(consumer);

		// Save the Consumer
		consumerObj.save(function() {
			// Try deleting Consumer
			request(app).delete('/consumers/' + consumerObj._id)
			.expect(401)
			.end(function(consumerDeleteErr, consumerDeleteRes) {
				// Set message assertion
				(consumerDeleteRes.body.message).should.match('User is not logged in');

				// Handle Consumer error error
				done(consumerDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Consumer.remove().exec();
		done();
	});
});