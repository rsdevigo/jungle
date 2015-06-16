'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$location', '$state', '$window', '$localStorage', '$http', 'Menus', 'KONGURL',
	function($scope, $location, $state, $window, $localStorage, $http, Menus, KONGURL) {
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.storage = $localStorage;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.setKongUrl = function() {
			var url = this.url;
			$http.get(this.url).success(function(data, status){
				if (status === 200) {
					$localStorage.kongurl = url;
					$location.path('/');
				}
			}).
			error(function(data, status){
				
			});
			
		};

		$scope.removeKongUrl = function() {
			delete $localStorage.kongurl;
			$state.go($state.current, {}, {reload: true});
		};
	}
]);