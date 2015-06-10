'use strict';

// Consumers controller
angular.module('consumers').controller('ConsumersController', ['$scope', '$stateParams', '$location', 'Consumers', 'PLUGINSAVAILABLE', 'Plugins',
	function($scope, $stateParams, $location, Consumers, PLUGINSAVAILABLE, Plugins) {

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
			console.log($stateParams.consumerId);
			$scope.consumer = Consumers.get({ 
				consumerId: $stateParams.consumerId
			});
		};

		$scope.initPluginForm = function() {
			$scope.pluginAvailable = PLUGINSAVAILABLE;
			$scope.currentPlugin = null;
			$scope.value = {};
		};

		$scope.removePlugin = function(plugin) {
			if ( plugin ) { 
				plugin.$remove();

				for (var i in $scope.plugins) {
					if ($scope.plugins [i] === plugin) {
						$scope.plugins.splice(i, 1);
					}
				}
			}
		};

		$scope.createPlugin = function() {
			if ($scope.currentPlugin !== null) {
				var plugin = new Plugins({
					value: $scope.value,
					name: $scope.currentPlugin.name,
					api_id: $stateParams.apiId
				});
				plugin.$save(function(response) {
					$scope.initPluginForm();
					$scope.listPluginByApi();
					$location.path('consumers/' + response.consumer_id + '/plugins');
				}, function(errorResponse) {
					$scope.error = errorResponse.data;
				});
			}
		};
	}
]);