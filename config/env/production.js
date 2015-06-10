'use strict';

module.exports = {
	assets: {
		lib: {
			css: [
				'lib/bootstrap/dist/css/bootstrap.min.css',
				'lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: [
				'lib/angular/angular.min.js',
				'lib/angular-resource/angular-resource.js', 
				'lib/angular-cookies/angular-cookies.js', 
				'lib/angular-animate/angular-animate.js', 
				'lib/angular-touch/angular-touch.js', 
				'lib/angular-sanitize/angular-sanitize.js', 
				'lib/angular-ui-router/release/angular-ui-router.min.js',
				'lib/angular-ui-utils/ui-utils.min.js',
				'lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		css: 'dist/application.min.css',
		js: 'dist/application.min.js'
	}
};
