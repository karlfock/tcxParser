"use strict";

require("../../bower_components/angular/angular.js");
require("../../bower_components/ng-file-upload/angular-file-upload.js");
require("./services.js");


angular.module('myApp.controllers', ['myApp.services', 'angularFileUpload'])

    .controller('UploadCtrl', ['$scope', '$injector', 'trackService', function ($scope, $injector, trackService) {
        var UploadCtrl = require("./controllers/uploadCtrl");
        $injector.invoke(UploadCtrl, this, {'$scope': $scope, 'trackService': trackService});
    }])

    .controller('UploadViewCtrl', ['$scope', '$injector', 'trackService', function ($scope, $injector, trackService) {
        var UploadViewCtrl = require("./controllers/uploadViewCtrl.js");
        $injector.invoke(UploadViewCtrl, this, {'$scope': $scope, 'trackService': trackService});
    }]);