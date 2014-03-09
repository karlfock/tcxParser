"use strict";

require("../../bower_components/angular/angular")
require("../../bower_components/ng-file-upload/angular-file-upload")
require("./services");


angular.module('myApp.directives', ['myApp.services'])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);


