'use strict';

//Apis service used to communicate Apis REST endpoints
angular.module('apis').factory('Apis', ['$resource', '$localStorage',
	function($resource, $localStorage) {
		return $resource($localStorage.kongurl+'/apis/:apiId', { apiId: '@id'
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

//Plugin service used to communicate Apis REST endpoints
angular.module('apis').factory('Plugins', ['$resource', '$localStorage',
	function($resource, $localStorage) {
		return $resource($localStorage.kongurl+'/apis/:apiId/plugins/:pluginId', { apiId: '@api_id', pluginId: '@id'
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

angular.module('apis').factory('PluginsConfigurations', ['$resource', 'KONGURL',
	function($resource, KONGURL) {
		return $resource(KONGURL+'/plugins_configurations', { pluginId: '@id'
		}, {
			query: {
				method: 'GET',
				isArray: false
			}
		});
	}
]);