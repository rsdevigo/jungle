'use strict';

//Apis service used to communicate Apis REST endpoints
angular.module('apis').factory('Apis', ['$resource',
	function($resource) {
		return $resource('apis/:apiId', { apiId: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Plugin service used to communicate Apis REST endpoints
angular.module('apis').factory('Plugins', ['$resource',
	function($resource) {
		return $resource('apis/:apiId/plugins/:pluginId', { apiId: '@api_id', pluginId: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);