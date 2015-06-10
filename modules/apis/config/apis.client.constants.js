'use strict';

//Setting up route
angular.module('apis').constant('PLUGINSAVAILABLE', [
	{
		name: 'ratelimiting',
		label: 'Rate Limiting',
		docUrl: 'http://getkong.org/plugins/rate-limiting/',
		schema: [
			{
				'name':'limit',
				'type' : 'integer',
				'label': 'Limit'
			},
			{
				'name':'period',
				'type' : 'enum',
				'label': 'Period',
				'values': [
					{ 'label' : 'Second', 'value' : 'second'},
					{ 'label' : 'Minute', 'value' : 'minute'},
					{ 'label' : 'Hour', 'value' : 'hour'},
					{ 'label' : 'Day', 'value' : 'day'},
					{ 'label' : 'Month', 'value' : 'month'},
					{ 'label' : 'Year', 'value' : 'year'}
				]
			}
		]
	},
	{
		name: 'httplog',
		label: 'Http Log',
		docUrl: 'http://getkong.org/plugins/http-log/',
		schema: [
			{
				'name':'http_endpoint',
				'type' : 'string',
				'label': 'Http endpoint'
			},
			{
				'name':'timeout',
				'type' : 'integer',
				'label': 'Timeout'
			},
			{
				'name':'keepalive',
				'type' : 'integer',
				'label': 'Keepalive'
			},
			{
				'name':'method',
				'type' : 'enum',
				'label': 'Method',
				'values': [
					{ 'label' : 'POST', 'value' : 'POST'},
					{ 'label' : 'PATCH', 'value' : 'PATCH'},
					{ 'label' : 'PUT', 'value' : 'PUT'}
				]
			}
		]
	},
]);