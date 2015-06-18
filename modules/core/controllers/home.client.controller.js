'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$localStorage', 'PLUGINSAVAILABLE',
	function($scope, $http, $localStorage, PLUGINSAVAILABLE) {
		$scope.storage = $localStorage;
		$scope.isArray = angular.isArray;
		$scope.pluginsAvailable = PLUGINSAVAILABLE;
		if ($localStorage.kongurl !== undefined) {
			$http.get($localStorage.kongurl).
				success(function(data, status){
					$scope.serverInfo = data;
				});
		}
		
	}
]);