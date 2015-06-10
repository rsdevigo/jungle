'use strict';

// Configuring the Articles module
angular.module('consumers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Consumers', 'consumers', 'dropdown', '/consumers(/create)?');
		Menus.addSubMenuItem('topbar', 'consumers', 'List Consumers', 'consumers');
		Menus.addSubMenuItem('topbar', 'consumers', 'New Consumer', 'consumers/create');
	}
]);