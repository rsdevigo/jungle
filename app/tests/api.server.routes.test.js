'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Api = mongoose.model('Api'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, api;

/**
 * Api routes tests
 */
describe('Api CRUD tests', function() {
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

		// Save a user to the test db and create new Api
		user.save(function() {
			api = {
				name: 'Api Name'
			};

			done();
		});
	});

	it('should be able to save Api instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Api
				agent.post('/apis')
					.send(api)
					.expect(200)
					.end(function(apiSaveErr, apiSaveRes) {
						// Handle Api save error
						if (apiSaveErr) done(apiSaveErr);

						// Get a list of Apis
						agent.get('/apis')
							.end(function(apisGetErr, apisGetRes) {
								// Handle Api save error
								if (apisGetErr) done(apisGetErr);

								// Get Apis list
								var apis = apisGetRes.body;

								// Set assertions
								(apis[0].user._id).should.equal(userId);
								(apis[0].name).should.match('Api Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Api instance if not logged in', function(done) {
		agent.post('/apis')
			.send(api)
			.expect(401)
			.end(function(apiSaveErr, apiSaveRes) {
				// Call the assertion callback
				done(apiSaveErr);
			});
	});

	it('should not be able to save Api instance if no name is provided', function(done) {
		// Invalidate name field
		api.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Api
				agent.post('/apis')
					.send(api)
					.expect(400)
					.end(function(apiSaveErr, apiSaveRes) {
						// Set message assertion
						(apiSaveRes.body.message).should.match('Please fill Api name');
						
						// Handle Api save error
						done(apiSaveErr);
					});
			});
	});

	it('should be able to update Api instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Api
				agent.post('/apis')
					.send(api)
					.expect(200)
					.end(function(apiSaveErr, apiSaveRes) {
						// Handle Api save error
						if (apiSaveErr) done(apiSaveErr);

						// Update Api name
						api.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Api
						agent.put('/apis/' + apiSaveRes.body._id)
							.send(api)
							.expect(200)
							.end(function(apiUpdateErr, apiUpdateRes) {
								// Handle Api update error
								if (apiUpdateErr) done(apiUpdateErr);

								// Set assertions
								(apiUpdateRes.body._id).should.equal(apiSaveRes.body._id);
								(apiUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Apis if not signed in', function(done) {
		// Create new Api model instance
		var apiObj = new Api(api);

		// Save the Api
		apiObj.save(function() {
			// Request Apis
			request(app).get('/apis')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Api if not signed in', function(done) {
		// Create new Api model instance
		var apiObj = new Api(api);

		// Save the Api
		apiObj.save(function() {
			request(app).get('/apis/' + apiObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', api.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Api instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Api
				agent.post('/apis')
					.send(api)
					.expect(200)
					.end(function(apiSaveErr, apiSaveRes) {
						// Handle Api save error
						if (apiSaveErr) done(apiSaveErr);

						// Delete existing Api
						agent.delete('/apis/' + apiSaveRes.body._id)
							.send(api)
							.expect(200)
							.end(function(apiDeleteErr, apiDeleteRes) {
								// Handle Api error error
								if (apiDeleteErr) done(apiDeleteErr);

								// Set assertions
								(apiDeleteRes.body._id).should.equal(apiSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Api instance if not signed in', function(done) {
		// Set Api user 
		api.user = user;

		// Create new Api model instance
		var apiObj = new Api(api);

		// Save the Api
		apiObj.save(function() {
			// Try deleting Api
			request(app).delete('/apis/' + apiObj._id)
			.expect(401)
			.end(function(apiDeleteErr, apiDeleteRes) {
				// Set message assertion
				(apiDeleteRes.body.message).should.match('User is not logged in');

				// Handle Api error error
				done(apiDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Api.remove().exec();
		done();
	});
});