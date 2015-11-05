'use strict';

// Apis controller
angular.module('apis').controller('ApisController', ['$scope', '$stateParams', '$location', '$state', 'Apis', 'Plugins', 'PLUGINSAVAILABLE',
	function($scope, $stateParams, $location, $state, Apis, Plugins, PLUGINSAVAILABLE) {

		// Create new Api
		$scope.create = function() {
			// Create new Api object
			var api = new Apis ({
				name: this.name,
				request_host: this.request_host,
				request_path: this.request_path,
				strip_request_path: this.strip_request_path,
				preserve_host: this.preserve_host,
				upstream_url : this.upstream_url
			});

			// Redirect after save
			api.$save(function(response) {
				$location.path('apis/' + response.id);

				// Clear form fields
				$scope.name = '';
				$scope.request_host = '';
				$scope.request_path = '';
				$scope.strip_request_path = '';
				$scope.preserve_host = '';
				$scope.upstream_url = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data;
			});
		};

		// Remove existing Api
		$scope.remove = function(api) {
			if ( api ) {
				api.$remove();

				for (var i in $scope.apis) {
					if ($scope.apis [i] === api) {
						$scope.apis.splice(i, 1);
					}
				}
			} else {

				$scope.api.$remove(function() {
					$location.path('apis');
				}, function(errorResponse) {
					$location.path('apis');
				});
			}
		};

		// Update existing Api
		$scope.update = function() {
			var api = $scope.api;
			api.$update(function() {
				$location.path('apis/' + api.id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data;
			});
		};

		// Find a list of Apis
		$scope.find = function() {
			$scope.apis = Apis.query($location.search());
			$scope.scroll= {busy : false};
		};

		// Find existing Api
		$scope.findOne = function() {
			$scope.api = Apis.get({
				apiId: $stateParams.apiId
			});
		};

		$scope.listPluginByApi = function() {
			$scope.pluginAvailable = PLUGINSAVAILABLE;
			$scope.findOne();
			$scope.plugins = Plugins.query({
				apiId: $stateParams.apiId
			});
		};


		$scope.initPluginForm = function() {
			$scope.pluginAvailable = PLUGINSAVAILABLE;
			$scope.currentPlugin = null;
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
				var opt = $scope.value;
				opt["name"]   = $scope.currentPlugin.name;
				opt["api_id"] = $stateParams.apiId;
				var plugin = new Plugins(opt);
				plugin.$save(function(response) {
					$scope.initPluginForm();
					$state.go($state.current, {}, {reload: true});
				}, function(errorResponse) {
					$scope.error = errorResponse.data;
				});
			}
		};

		$scope.saveApi = function(data, id) {
			var api = new Apis (data);
			api.id = id;
			api.$update(function() {
				for (var i in $scope.apis.data) {
					if ($scope.apis.data [i] . id === id) {
						angular.extend($scope.apis.data [i], data);
					}
				}
			}, function(errorResponse) {
				$scope.error = errorResponse.data;
			});
		};

		$scope.nextPage = function() {
			if ($scope.scroll.busy){
				$scope.scroll.busy = false;
				return;
			}

			$scope.scroll.busy = true;


			if (undefined === $scope.apis.next){
				$scope.scroll.busy = false;
				return;
			}

			var offset = new URI($scope.apis.next).search(true).offset;
			Apis.query({offset: offset}, function(apis){
				$scope.apis.next = apis.next;
				$scope.apis.data = $scope.apis.data.concat(apis.data);
				$scope.scroll.busy = false;
			});
		};

		// Set sorting default configuration
		$scope.sortType = 'name';
		$scope.sortReverse = false;
	}
]);
