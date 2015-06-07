'use strict';

//Setting up route
angular.module('consumers').config(['$stateProvider',
	function($stateProvider) {
		// Consumers state routing
		$stateProvider.
		state('listConsumers', {
			url: '/consumers',
			templateUrl: 'modules/consumers/views/list-consumers.client.view.html'
		}).
		state('createConsumer', {
			url: '/consumers/create',
			templateUrl: 'modules/consumers/views/create-consumer.client.view.html'
		}).
		state('viewConsumer', {
			url: '/consumers/:consumerId',
			templateUrl: 'modules/consumers/views/view-consumer.client.view.html'
		}).
		state('editConsumer', {
			url: '/consumers/:consumerId/edit',
			templateUrl: 'modules/consumers/views/edit-consumer.client.view.html'
		});
	}
]);