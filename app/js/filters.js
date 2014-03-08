"use strict";

require("../../bower_components/angular/angular.js")
require("./services.js");


angular.module('myApp.filters', ['myApp.services'])
    .filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

