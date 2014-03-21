"use strict";

require ("../../bower_components/angular/angular");
require ("./filters");
require ("./services");
require ("./directives");
require ("./controllers");
require ("../../bower_components/angular-route/angular-route");


// Declare app level module which depends on filters, and services

var app = angular.module("myApp", [
    "ngRoute",
    "myApp.controllers",
    "myApp.filters",
    "myApp.services",
    "myApp.directives"
]);

module.exports = app;