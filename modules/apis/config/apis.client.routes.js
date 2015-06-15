'use strict';

//Setting up route
angular.module('apis').config(['$stateProvider',
	function($stateProvider) {
		// Apis state routing
		$stateProvider.
		state('listApis', {
			url: '/apis',
			templateUrl: 'modules/apis/views/list-apis.client.view.html',
			ncyBreadcrumb: {
				label: 'List Apis',
				parent: 'home'
			},
			reloadOnSearch: true
		}).
		state('createApi', {
			url: '/apis/create',
			templateUrl: 'modules/apis/views/create-api.client.view.html',
			ncyBreadcrumb: {
				label: 'Create API',
				parent: 'home'
			},
			reloadOnSearch: true
		}).
		state('viewApi', {
			url: '/apis/:apiId',
			templateUrl: 'modules/apis/views/view-api.client.view.html',
			ncyBreadcrumb: {
				label: 'View API',
				parent: 'listApis'
			},
			reloadOnSearch: true
		}).
		state('editApi', {
			url: '/apis/:apiId/edit',
			templateUrl: 'modules/apis/views/edit-api.client.view.html',
			ncyBreadcrumb: {
				label: 'Edit API',
				parent: 'viewApi'
			},
			reloadOnSearch: true
		}).
		state('viewPluginApi', {
			url: '/apis/:apiId/plugins',
			templateUrl: 'modules/apis/views/view-api-plugin.client.view.html',
			ncyBreadcrumb: {
				label: 'List Plugins for API',
				parent: 'viewApi'
			},
			reloadOnSearch: true
		});
	}
]);