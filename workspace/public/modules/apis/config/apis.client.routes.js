'use strict';

//Setting up route
angular.module('apis').config(['$stateProvider',
	function($stateProvider) {
		// Apis state routing
		$stateProvider.
		state('listApis', {
			url: '/apis',
			templateUrl: 'modules/apis/views/list-apis.client.view.html'
		}).
		state('createApi', {
			url: '/apis/create',
			templateUrl: 'modules/apis/views/create-api.client.view.html'
		}).
		state('viewApi', {
			url: '/apis/:apiId',
			templateUrl: 'modules/apis/views/view-api.client.view.html'
		}).
		state('editApi', {
			url: '/apis/:apiId/edit',
			templateUrl: 'modules/apis/views/edit-api.client.view.html'
		});
	}
]);