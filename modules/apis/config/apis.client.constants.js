'use strict';

//Setting up route
angular.module('apis').constant('PLUGINSAVAILABLE', [
	
	{
		name: 'http-log',
		label: 'Http Log',
		docUrl: 'http://getkong.org/plugins/http-log/',
		schema: [
			{
				'name':'config.http_endpoint',
				'type' : 'string',
				'label': 'Http endpoint'
			},
			{
				'name':'config.timeout',
				'type' : 'integer',
				'label': 'Timeout'
			},
			{
				'name':'config.keepalive',
				'type' : 'integer',
				'label': 'Keepalive'
			},
			{
				'name':'config.method',
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
	{
		name: 'udp-log',
		label: 'UDP Log',
		docUrl: 'http://getkong.org/plugins/udp-log/',
		schema: [
			{
				'name':'config.host',
				'type' : 'string',
				'label': 'Host'
			},
			{
				'name':'config.timeout',
				'type' : 'integer',
				'label': 'Timeout'
			},
			{
				'name':'config.port',
				'type' : 'integer',
				'label': 'Port'
			}
		]
	},
	{
		name: 'tcp-log',
		label: 'TCP Log',
		docUrl: 'http://getkong.org/plugins/tcp-log/',
		schema: [
			{
				'name':'config.host',
				'type' : 'string',
				'label': 'Host'
			},
			{
				'name':'config.timeout',
				'type' : 'integer',
				'label': 'Timeout'
			},
			{
				'name':'config.port',
				'type' : 'integer',
				'label': 'Port'
			},
			{
				'name':'config.keepalive',
				'type' : 'integer',
				'label': 'Keepalive'
			}
		]
	},
	{
		name: 'file-log',
		label: 'File Log',
		docUrl: 'http://getkong.org/plugins/file-log/',
		schema: [
			{
				'name':'config.path',
				'type' : 'string',
				'label': 'The output path file'
			}
		]
	},
	{
		name: 'basic-auth',
		label: 'Basic Authentication',
		docUrl: 'http://getkong.org/plugins/basic-authentication/',
		schema: [
			{
				'name':'config.hide_credentials',
				'type' : 'boolean',
				'label': 'Hide Credentials'
			}
		],
		api : {
			routes : [
				{
					'action': 'list',
					'route': 'consumers/:username/basic-auth',
					'method': 'GET',
					'params': ['username']
				},
				{
					'action': 'create',
					'route': 'consumers/:username/basic-auth',
					'method': 'POST',
					'params': ['username']
				},
				{
					'action': 'view',
					'route': 'consumers/:username/basic-auth/:id',
					'method': 'GET',
					'params': ['username', 'id']
				},
				{
					'action': 'update',
					'route': 'consumers/:username/basic-auth/:id',
					'method': 'PATCH',
					'params': ['username', 'id']
				},
				{
					'action': 'delete',
					'route': 'consumers/:username/basic-auth/:id',
					'method': 'DELETE',
					'params': ['username', 'id']
				}
			],
			dao : [
				{
					'name':'username',
					'type' : 'string',
					'label': 'Username'
				},
				{
					'name':'password',
					'type' : 'string',
					'label': 'Password'
				},
			]
		}
		
	},
	{
		name: 'key-auth',
		label: 'Key Authentication',
		docUrl: 'http://getkong.org/plugins/key-authentication/',
		schema: [
			{
				'name':'config.hide_credentials',
				'type' : 'boolean',
				'label': 'Hide Credentials'
			},
			{
				'name':'config.key_names',
				'type' : 'string',
				'label': 'Key Names'
			}
		],
		api :
			{
				routes : [
					{
						'action': 'list',
						'route': 'consumers/:username/key-auth',
						'method': 'GET',
						'params': ['username']
					},
					{
						'action': 'create',
						'route': 'consumers/:username/key-auth',
						'method': 'POST',
						'params': ['username']
					},
					{
						'action': 'view',
						'route': 'consumers/:username/key-auth/:id',
						'method': 'GET',
						'params': ['username', 'id']
					},
					{
						'action': 'update',
						'route': 'consumers/:username/key-auth/:id',
						'method': 'PATCH',
						'params': ['username', 'id']
					},
					{
						'action': 'delete',
						'route': 'consumers/:username/key-auth/:id',
						'method': 'DELETE',
						'params': ['username', 'id']
					}
				],
				dao : [
					{
						'name':'key',
						'type' : 'string',
						'label': 'Key'
					}
				]
			}
		
	},
	{
		name: 'cors',
		label: 'CORS',
		docUrl: 'http://getkong.org/plugins/cors/',
		schema: [
			{
				'name':'config.origin',
				'type' : 'string',
				'label': 'Origin'
			},
			{
				'name':'config.methods',
				'type' : 'string',
				'label': 'Method'
			},
			{
				'name':'config.headers',
				'type' : 'string',
				'label': 'Headers'
			},
			{
				'name':'config.exposed_headers',
				'type' : 'string',
				'label': 'Exposed Headers'
			},
			{
				'name':'config.credentials',
				'type' : 'boolean',
				'label': 'Credentials'
			},
			{
				'name':'config.max_age',
				'type' : 'integer',
				'label': 'Max age'
			}
		]
	},
	{
		name: 'ssl',
		label: 'SSL',
		docUrl: 'http://getkong.org/plugins/ssl/',
		schema: [
			{
				'name':'config.cert',
				'type' : 'string',
				'label': 'Certificate file path'
			},
			{
				'name':'config.key',
				'type' : 'string',
				'label': 'Certificate key path'
			},
			{
				'name':'config.only_https',
				'type' : 'boolean',
				'label': 'Only HTTPS'
			}
		]
	},
	{
		name: 'request-transformer',
		label: 'Request Transformer',
		docUrl: 'http://getkong.org/plugins/request-transformer/',
		schema: [
			{
				'name':'config.add.headers',
				'type' : 'string',
				'label': 'Headers to add'
			},
			{
				'name':'config.add.querystring',
				'type' : 'string',
				'label': 'Parameters to add in request querystring'
			},
			{
				'name':'config.add.form',
				'type' : 'string',
				'label': 'Values to add in request body'
			},
			{
				'name':'config.remove.headers',
				'type' : 'string',
				'label': 'Headers to remove'
			},
			{
				'name':'config.remove.querystring',
				'type' : 'string',
				'label': 'Parameters to remove in request querystring'
			},
			{
				'name':'config.remove.form',
				'type' : 'string',
				'label': 'Values to remove in request body'
			}
		]
	},
	{
		name: 'response-transformer',
		label: 'Response Transformer',
		docUrl: 'http://getkong.org/plugins/response-transformer/',
		schema: [
			{
				'name':'config.add.headers',
				'type' : 'string',
				'label': 'Headers to add'
			},
			{
				'name':'config.add.json',
				'type' : 'string',
				'label': 'Values to add to a JSON response body'
			},
			{
				'name':'config.remove.headers',
				'type' : 'string',
				'label': 'Headers to remove'
			},
			{
				'name':'config.remove.json',
				'type' : 'string',
				'label': 'Values to remove to a JSON response body'
			}
		]
	},
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
		name: 'request-size-limiting',
		label: 'Request Size Limiting',
		docUrl: 'http://getkong.org/plugins/request-size-limiting/',
		schema: [
			{
				'name':'config.allowed_payload_size',
				'type' : 'integer',
				'label': 'Allowed request payload size in megabytes'
			}
		]
	}
]);