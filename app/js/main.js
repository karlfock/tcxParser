require.config({
	paths: {
        angular: '../../bower_components/angular/angular',
        angularRoute: '../../bower_components/angular-route/angular-route',
        angularMocks: '../../bower_components/angular-mocks/angular-mocks',
        angularFileUpload: '../../bower_components/ng-file-upload/angular-file-upload',
        text: '../../bower_components/requirejs-text/text',
        moment: '../../bower_components/moment/moment'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
        if(angular.resumeBootstrap) {
            angular.resumeBootstrap([app['name']]);
        }
    });
});
