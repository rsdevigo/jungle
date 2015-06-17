'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$localStorage',
	function($scope, $http, $localStorage) {
		$scope.storage = $localStorage;

		if ($localStorage.kongurl !== undefined) {
			$http.get($localStorage.kongurl).
				success(function(data, status){
					$scope.serverInfo = data;
				});
		}
		
	}
]);