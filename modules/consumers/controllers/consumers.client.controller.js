'use strict';

// Consumers controller
angular.module('consumers').controller('ConsumersController', ['$scope', '$stateParams', '$location', '$state', '$filter', '$http', 'Consumers', 'PLUGINSAVAILABLE', 'PluginsConfigurations', 'Apis', 'Plugins', '$localStorage',
	function($scope, $stateParams, $location, $state, $filter, $http, Consumers, PLUGINSAVAILABLE, PluginsConfigurations, Apis, Plugins, $localStorage) {

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
			$scope.scroll= {busy : false};
		};

		// Find existing Consumer
		$scope.findOne = function() {
			$scope.pluginAvailable = PLUGINSAVAILABLE;
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
					$state.go($state.current, {}, {reload: true});
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
		};

		$scope.hasApi = function(element) {
			return undefined !== element.api;
		};

		$scope.crudPlugin = function() {

			$scope.plugin = $filter('filter')(PLUGINSAVAILABLE, 
				function(element){ return $stateParams.pluginName === element.name}
			);

			$scope.plugin = $scope.plugin[0];

			if ($scope.plugin.api === undefined) {
				$location.path('consumers/' + $stateParams.consumerId);
			}
			
			var routeList = $filter('filter')($scope.plugin.api.routes, {action: 'list'})[0];

			var route = routeList.route.replace(':username', $stateParams.consumerId);

			$http.get($localStorage.kongurl+'/'+route).
				success(function(data, status){
					$scope.items = data;
				});
			
		};

		$scope.addRow = function() {
			$scope.inserted = {id: null};
			angular.forEach($scope.plugin.api.dao, function(field){
				$scope.inserted[field.name] = '';
			});

		    $scope.items.data.push($scope.inserted);
		};

		$scope.saveItem = function(data, id, index) {
			if (id === null) {
				var routeList = $filter('filter')($scope.plugin.api.routes, {action: 'create'})[0];

				var route = routeList.route.replace(':username', $stateParams.consumerId);

				$http.post($localStorage.kongurl+'/'+route, data).
					success(function(data, status){
						$scope.items.data[index].id = data.id;
					});

			} else {
				var routeList = $filter('filter')($scope.plugin.api.routes, {action: 'update'})[0];

				var route = routeList.route.replace(':username', $stateParams.consumerId);

				var route = route.replace(':id', id);

				$http.patch($localStorage.kongurl+'/'+route, data);
			}
		};

		$scope.removeItem = function(index) {

			var id = $scope.items.data[index].id;

			var routeList = $filter('filter')($scope.plugin.api.routes, {action: 'delete'})[0];

			var route = routeList.route.replace(':username', $stateParams.consumerId);

			var route = route.replace(':id', id);

			$http.delete($localStorage.kongurl+'/'+route).
				success(function(data, status){
					$scope.items.data.splice(index, 1);
				});
		};

		$scope.nextPage = function() {
			if ($scope.scroll.busy){
				$scope.scroll.busy = false;
				return;
			} 

			$scope.scroll.busy = true;


			if (undefined === $scope.consumers.next){
				$scope.scroll.busy = false;
				return;
			}

			var offset = new URI($scope.consumers.next).search(true).offset;
			Consumers.query({offset: offset}, function(consumers){
				$scope.consumers.next = consumers.next;
				$scope.consumers.data = $scope.consumers.data.concat(consumers.data);
				$scope.scroll.busy = false;
			});
		};
	}
]);