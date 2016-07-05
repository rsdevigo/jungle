'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$localStorage', 'PLUGINSAVAILABLE', 'KONGURL',
	function($scope, $http, $localStorage, PLUGINSAVAILABLE, KONGURL) {
		$scope.storage = $localStorage;
		$scope.isArray = angular.isArray;
		$scope.pluginsAvailable = PLUGINSAVAILABLE;
		if ($localStorage.hasDisconnected !== true && typeof KONGURL !== 'undefined'){
			$localStorage.kongurl = KONGURL;
		}
		if ($localStorage.kongurl !== undefined) {
			$http.get($localStorage.kongurl).
				success(function(data, status){
					$scope.serverInfo = data;
				});
		}
	}
]);
