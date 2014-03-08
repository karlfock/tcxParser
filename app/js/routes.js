"use strict";

require("../../bower_components/angular/angular.js");
var app = require("./app.js");

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/uploadView', {
        templateUrl: 'app/partials/uploaded.html',
        controller: 'UploadViewCtrl'
    })
        .otherwise({redirectTo: '/'});
}]);

