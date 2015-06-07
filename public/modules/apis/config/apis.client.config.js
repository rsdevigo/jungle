'use strict';

// Configuring the Articles module
angular.module('apis').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Apis', 'apis', 'dropdown', '/apis(/create)?');
		Menus.addSubMenuItem('topbar', 'apis', 'List Apis', 'apis');
		Menus.addSubMenuItem('topbar', 'apis', 'New Api', 'apis/create');
	}
]);