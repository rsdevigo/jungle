'use strict';

(function() {
	// Apis Controller Spec
	describe('Apis Controller Tests', function() {
		// Initialize global variables
		var ApisController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Apis controller.
			ApisController = $controller('ApisController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Api object fetched from XHR', inject(function(Apis) {
			// Create sample Api using the Apis service
			var sampleApi = new Apis({
				name: 'New Api'
			});

			// Create a sample Apis array that includes the new Api
			var sampleApis = [sampleApi];

			// Set GET response
			$httpBackend.expectGET('apis').respond(sampleApis);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.apis).toEqualData(sampleApis);
		}));

		it('$scope.findOne() should create an array with one Api object fetched from XHR using a apiId URL parameter', inject(function(Apis) {
			// Define a sample Api object
			var sampleApi = new Apis({
				name: 'New Api'
			});

			// Set the URL parameter
			$stateParams.apiId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/apis\/([0-9a-fA-F]{24})$/).respond(sampleApi);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.api).toEqualData(sampleApi);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Apis) {
			// Create a sample Api object
			var sampleApiPostData = new Apis({
				name: 'New Api'
			});

			// Create a sample Api response
			var sampleApiResponse = new Apis({
				_id: '525cf20451979dea2c000001',
				name: 'New Api'
			});

			// Fixture mock form input values
			scope.name = 'New Api';

			// Set POST response
			$httpBackend.expectPOST('apis', sampleApiPostData).respond(sampleApiResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Api was created
			expect($location.path()).toBe('/apis/' + sampleApiResponse._id);
		}));

		it('$scope.update() should update a valid Api', inject(function(Apis) {
			// Define a sample Api put data
			var sampleApiPutData = new Apis({
				_id: '525cf20451979dea2c000001',
				name: 'New Api'
			});

			// Mock Api in scope
			scope.api = sampleApiPutData;

			// Set PUT response
			$httpBackend.expectPUT(/apis\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/apis/' + sampleApiPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid apiId and remove the Api from the scope', inject(function(Apis) {
			// Create new Api object
			var sampleApi = new Apis({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Apis array and include the Api
			scope.apis = [sampleApi];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/apis\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleApi);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.apis.length).toBe(0);
		}));
	});
}());