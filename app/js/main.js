//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require ("../../bower_components/angular/angular");
var app = require ("./app");
require ("./routes");

'use strict';
var $html = angular.element(document.getElementsByTagName('html')[0]);


angular.element().ready(function() {
    if(angular.resumeBootstrap) {
        angular.resumeBootstrap([app['name']]);
    }
});