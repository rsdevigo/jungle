'use strict';

//Setting up route
angular.module('apis').constant('PLUGINSAVAILABLE', [
	
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
	{
		name: 'udplog',
		label: 'UDP Log',
		docUrl: 'http://getkong.org/plugins/udp-log/',
		schema: [
			{
				'name':'host',
				'type' : 'string',
				'label': 'Host'
			},
			{
				'name':'timeout',
				'type' : 'integer',
				'label': 'Timeout'
			},
			{
				'name':'port',
				'type' : 'integer',
				'label': 'Port'
			}
		]
	},
	{
		name: 'tcplog',
		label: 'TCP Log',
		docUrl: 'http://getkong.org/plugins/tcp-log/',
		schema: [
			{
				'name':'host',
				'type' : 'string',
				'label': 'Host'
			},
			{
				'name':'timeout',
				'type' : 'integer',
				'label': 'Timeout'
			},
			{
				'name':'port',
				'type' : 'integer',
				'label': 'Port'
			},
			{
				'name':'keepalive',
				'type' : 'integer',
				'label': 'Keepalive'
			}
		]
	},
	{
		name: 'filelog',
		label: 'File Log',
		docUrl: 'http://getkong.org/plugins/file-log/',
		schema: [
			{
				'name':'path',
				'type' : 'string',
				'label': 'The output path file'
			}
		]
	},
	{
		name: 'basicauth',
		label: 'Basic Authentication',
		docUrl: 'http://getkong.org/plugins/basic-authentication/',
		schema: [
			{
				'name':'hide_credentials',
				'type' : 'boolean',
				'label': 'Hide Credentials'
			}
		],
		api : {
			routes : [
				{
					'action': 'list',
					'route': 'consumers/:username/basicauth',
					'method': 'GET',
					'params': ['username']
				},
				{
					'action': 'create',
					'route': 'consumers/:username/basicauth',
					'method': 'POST',
					'params': ['username']
				},
				{
					'action': 'view',
					'route': 'consumers/:username/basicauth/:id',
					'method': 'GET',
					'params': ['username', 'id']
				},
				{
					'action': 'update',
					'route': 'consumers/:username/basicauth/:id',
					'method': 'PATCH',
					'params': ['username', 'id']
				},
				{
					'action': 'delete',
					'route': 'consumers/:username/basicauth/:id',
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
		name: 'keyauth',
		label: 'Key Authentication',
		docUrl: 'http://getkong.org/plugins/key-authentication/',
		schema: [
			{
				'name':'hide_credentials',
				'type' : 'boolean',
				'label': 'Hide Credentials'
			},
			{
				'name':'key_names',
				'type' : 'string',
				'label': 'Key Names'
			}
		],
		api :
			{
				routes : [
					{
						'action': 'list',
						'route': 'consumers/:username/keyauth',
						'method': 'GET',
						'params': ['username']
					},
					{
						'action': 'create',
						'route': 'consumers/:username/keyauth',
						'method': 'POST',
						'params': ['username']
					},
					{
						'action': 'view',
						'route': 'consumers/:username/keyauth/:id',
						'method': 'GET',
						'params': ['username', 'id']
					},
					{
						'action': 'update',
						'route': 'consumers/:username/keyauth/:id',
						'method': 'PATCH',
						'params': ['username', 'id']
					},
					{
						'action': 'delete',
						'route': 'consumers/:username/keyauth/:id',
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
				'name':'origin',
				'type' : 'string',
				'label': 'Origin'
			},
			{
				'name':'methods',
				'type' : 'string',
				'label': 'Method'
			},
			{
				'name':'headers',
				'type' : 'string',
				'label': 'Headers'
			},
			{
				'name':'exposed_headers',
				'type' : 'string',
				'label': 'Exposed Headers'
			},
			{
				'name':'credentials',
				'type' : 'boolean',
				'label': 'Credentials'
			},
			{
				'name':'max_age',
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
				'name':'cert',
				'type' : 'string',
				'label': 'Certificate file path'
			},
			{
				'name':'key',
				'type' : 'string',
				'label': 'Certificate key path'
			},
			{
				'name':'only_hhtps',
				'type' : 'boolean',
				'label': 'Only HTTPS'
			}
		]
	},
	{
		name: 'request_transformer',
		label: 'Request Transformer',
		docUrl: 'http://getkong.org/plugins/request-transformer/',
		schema: [
			{
				'name':'add.headers',
				'type' : 'string',
				'label': 'Headers to add'
			},
			{
				'name':'add.querystring',
				'type' : 'string',
				'label': 'Parameters to add in request querystring'
			},
			{
				'name':'add.form',
				'type' : 'string',
				'label': 'Values to add in request body'
			},
			{
				'name':'remove.headers',
				'type' : 'string',
				'label': 'Headers to remove'
			},
			{
				'name':'remove.querystring',
				'type' : 'string',
				'label': 'Parameters to remove in request querystring'
			},
			{
				'name':'remove.form',
				'type' : 'string',
				'label': 'Values to remove in request body'
			}
		]
	},
	{
		name: 'response_transformer',
		label: 'Response Transformer',
		docUrl: 'http://getkong.org/plugins/response-transformer/',
		schema: [
			{
				'name':'add.headers',
				'type' : 'string',
				'label': 'Headers to add'
			},
			{
				'name':'add.json',
				'type' : 'string',
				'label': 'Values to add to a JSON response body'
			},
			{
				'name':'remove.headers',
				'type' : 'string',
				'label': 'Headers to remove'
			},
			{
				'name':'remove.json',
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
		name: 'requestsizelimiting',
		label: 'Request Size Limiting',
		docUrl: 'http://getkong.org/plugins/request-size-limiting/',
		schema: [
			{
				'name':'allowed_payload_size',
				'type' : 'integer',
				'label': 'Allowed request payload size in megabytes'
			}
		]
	}
]);