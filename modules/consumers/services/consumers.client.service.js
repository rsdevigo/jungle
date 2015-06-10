'use strict';

//Consumers service used to communicate Consumers REST endpoints
angular.module('consumers').factory('Consumers', ['$resource', 'KONGURL',
	function($resource, KONGURL) {
		return $resource(KONGURL+'/consumers/:consumerId', { consumerId: '@id'
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