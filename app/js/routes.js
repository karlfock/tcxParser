"use strict";

require("../../bower_components/angular/angular");
var app = require("./app");

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/uploadView", {
        templateUrl: "app/partials/uploaded.html",
        controller: "UploadViewCtrl"
    })
        .when("/viewTrack/:trackId", {
            templateUrl: "app/partials/viewTrack.html",
            controller: "ViewTrackCtrl"
        })
        .otherwise({redirectTo: "/"});
}]);

