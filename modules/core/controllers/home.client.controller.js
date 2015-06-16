'use strict';


angular.module('core').controller('HomeController', ['$scope', '$localStorage',
	function($scope, $localStorage) {
		$scope.t = $localStorage.kongurl;
	}
]);