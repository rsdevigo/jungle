'use strict';

// Configuring the Articles module
angular.module('consumers').run(['Menus', 'editableOptions',
	function(Menus, editableOptions) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Consumers', 'consumers', 'dropdown', '/consumers(/create)?');
		Menus.addSubMenuItem('topbar', 'consumers', 'List Consumers', 'consumers');
		Menus.addSubMenuItem('topbar', 'consumers', 'New Consumer', 'consumers/create');
		editableOptions.theme = 'bs3';
	}
]);