'use strict';

// Consumers controller
angular.module('consumers').controller('ConsumersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Consumers',
	function($scope, $stateParams, $location, Authentication, Consumers) {
		$scope.authentication = Authentication;

		// Create new Consumer
		$scope.create = function() {
			// Create new Consumer object
			var consumer = new Consumers ({
				username: this.username,
				custom_id: this.custom_id
			});

			// Redirect after save
			consumer.$save(function(response) {
				$location.path('consumers/' + response.id);

				// Clear form fields
				$scope.username = '';
				$scope.custom_id = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data;
			});
		};

		// Remove existing Consumer
		$scope.remove = function(consumer) {
			if ( consumer ) { 
				consumer.$remove();

				for (var i in $scope.consumers) {
					if ($scope.consumers [i] === consumer) {
						$scope.consumers.splice(i, 1);
					}
				}
			} else {
				$scope.consumer.$remove(function() {
					$location.path('consumers');
				});
			}
		};

		// Update existing Consumer
		$scope.update = function() {
			var consumer = $scope.consumer;

			consumer.$update(function() {
				$location.path('consumers/' + consumer.id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data;
			});
		};

		// Find a list of Consumers
		$scope.find = function() {
			$scope.consumers = Consumers.query();
		};

		// Find existing Consumer
		$scope.findOne = function() {
			$scope.consumer = Consumers.get({ 
				consumerId: $stateParams.consumerId
			});
		};
	}
]);