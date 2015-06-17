(function() {
	// Consumers Controller Spec
	describe('Consumers Controller Tests', function() {
		// Initialize global variables
		var ConsumersController,
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
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _KONGURL_, _$localStorage_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			$KONGURL = _KONGURL_;
			$localStorage = _$localStorage_;
			$localStorage.kongurl = _KONGURL_;


			$httpBackend.when('GET', 'modules/core/views/home.client.view.html').respond(200, {});
			// Initialize the Consumers controller.
			ConsumersController = $controller('ConsumersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least findOne Consumer object fetched from XHR', inject(function(Consumers) {
			// Create sample Consumer using the Consumers service
			var sampleConsumer = new Consumers({
				username: 'New Consumer',
				custom_id: '4356'
			});

			// Create a sample Consumers array that includes the new Consumer
			var sampleConsumers = {data: [sampleConsumer]};

			// Set GET response
			$httpBackend.expectGET($KONGURL+'/consumers').respond(sampleConsumers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.consumers).toEqualData(sampleConsumers);
		}));

		it('$scope.findOne() should create an array with one Consumer object fetched from XHR using a consumerId URL parameter', inject(function(Consumers) {
			// Define a sample Consumer object
			var sampleConsumer = new Consumers({
				username: 'New Consumer',
				custom_id: '4356'
			});

			// Set the URL parameter
			$stateParams.consumerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/http:\/\/localhost:8000\/kongapi\/consumers\/([0-9a-fA-F]{24})$/).respond(sampleConsumer);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.consumer).toEqualData(sampleConsumer);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Consumers) {
			// Create a sample Consumer object
			var sampleConsumerPostData = new Consumers({
				username: 'New Consumer',
				custom_id: '4356'
			});

			// Create a sample Consumer response
			var sampleConsumerResponse = new Consumers({
				id: '525cf20451979dea2c000001',
				username: 'New Consumer',
				custom_id: '4356'
			});

			// Fixture mock form input values
			scope.username = 'New Consumer';
			scope.custom_id = '4356';

			// Set POST response
			$httpBackend.expectPOST($KONGURL+'/consumers', sampleConsumerPostData).respond(sampleConsumerResponse);
			$httpBackend.when('GET', 'modules/consumers/views/view-consumer.client.view.html').respond(200, {});

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.username).toEqual('');

			// Test URL redirection after the Consumer was created
			expect($location.path()).toBe('/consumers/' + sampleConsumerResponse.id);
		}));

		it('$scope.update() should update a valid Consumer', inject(function(Consumers) {
			// Define a sample Consumer put data
			var sampleConsumerPutData = new Consumers({
				id: '525cf20451979dea2c000001',
				username: 'New Consumer',
				custom_id: '4356'
			});

			// Mock Consumer in scope
			scope.consumer = sampleConsumerPutData;

			// Set PUT response
			$httpBackend.expectPATCH(/http:\/\/localhost:8000\/kongapi\/consumers\/([0-9a-fA-F]{24})$/).respond();
			$httpBackend.when('GET', 'modules/consumers/views/view-consumer.client.view.html').respond(200, {});
			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/consumers/' + sampleConsumerPutData.id);
		}));

		it('$scope.remove() should send a DELETE request with a valid consumerId and remove the Consumer from the scope', inject(function(Consumers) {
			// Create new Consumer object
			var sampleConsumer = new Consumers({
				id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Consumers array and include the Consumer
			scope.consumers = [sampleConsumer];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/consumers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleConsumer);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.consumers.length).toBe(0);
		}));
	});
}());