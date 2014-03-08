require ("../../bower_components/angular/angular.js");
require ("./filters.js");
require ("./services.js");
require ("./directives.js");
require ("./controllers.js");
require ("../../bower_components/angular-route/angular-route.js");

'use strict';

// Declare app level module which depends on filters, and services

var app = angular.module('myApp', [
    'ngRoute',
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    'myApp.directives'
]);

module.exports = app;