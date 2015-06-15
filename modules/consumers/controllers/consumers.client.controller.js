'use strict';

// Consumers controller
angular.module('consumers').controller('ConsumersController', ['$scope', '$stateParams', '$location', 'Consumers', 'PLUGINSAVAILABLE', 'PluginsConfigurations', 'Apis', 'Plugins',
	function($scope, $stateParams, $location, Consumers, PLUGINSAVAILABLE, PluginsConfigurations, Apis, Plugins) {

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
			$scope.consumers = Consumers.query($location.search());
		};

		// Find existing Consumer
		$scope.findOne = function() {
			console.log($stateParams.consumerId);
			$scope.consumer = Consumers.get({ 
				consumerId: $stateParams.consumerId
			});
		};

		$scope.listPluginByConsumer = function() {
			$scope.pluginAvailable = PLUGINSAVAILABLE;
			$scope.findOne();
			$scope.apis = Apis.query({size: 100000});
			$scope.plugins = PluginsConfigurations.query({
				consumer_id : $stateParams.consumerId
			});
		};


		$scope.initPluginForm = function() {
			$scope.pluginAvailable = PLUGINSAVAILABLE;
			$scope.currentPlugin = null;
			$scope.apis = Apis.query({size: 100000});
			$scope.api_id = null;
			$scope.value = {};
		};

		$scope.removePlugin = function(plugin) {
			if ( plugin ) { 
				var pluginResource = new Plugins(plugin);
				pluginResource.$remove();

				for (var i in $scope.plugins.data) {
					if ($scope.plugins.data [i] === plugin) {
						$scope.plugins.data.splice(i, 1);
					}
				}
			}
		};

		$scope.createPlugin = function() {
			if ($scope.currentPlugin !== null) {
				var plugin = new Plugins({
					value: $scope.value,
					name: $scope.currentPlugin.name,
					consumer_id: $stateParams.consumerId,
					api_id: $scope.api_id.id
				});
				plugin.$save(function(response) {
					$scope.initPluginForm();
					$location.path('apis/' + response.api_id + '/plugins');
				}, function(errorResponse) {
					$scope.error = errorResponse.data;
				});
			}
		};

		$scope.saveConsumer = function(data, id) {
			var consumer = new Consumers (data);
			consumer.id = id;
			consumer.$update(function() {
				for (var i in $scope.consumers.data) {
					if ($scope.consumers.data [i] . id === id) {
						angular.extend($scope.consumers.data [i], data);
					}
				}
			}, function(errorResponse) {
				$scope.error = errorResponse.data;
			});
		}
	}
]);