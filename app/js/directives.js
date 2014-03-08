"use strict";

require("../../bower_components/angular/angular.js")
require("../../bower_components/ng-file-upload/angular-file-upload.js")
require("./services.js");


angular.module('myApp.directives', ['myApp.services'])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);


