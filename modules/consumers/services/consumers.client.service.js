'use strict';

//Consumers service used to communicate Consumers REST endpoints
angular.module('consumers').factory('Consumers', ['$resource', '$localStorage',
	function($resource, $localStorage) {
		return $resource($localStorage.kongurl+'/consumers/:consumerId', { consumerId: '@id'
		}, {
			query: {
				method: 'GET',
				isArray: false
			},
			update: {
				method: 'PATCH'
			}
		});
	}
]);