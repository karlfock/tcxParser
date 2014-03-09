"use strict";

require("../../bower_components/angular/angular");
require("../../bower_components/ng-file-upload/angular-file-upload");
require("./services");


angular.module('myApp.controllers', ['myApp.services', 'angularFileUpload'])

    .controller('UploadCtrl', function ($scope, $injector, uploadedTracks) {
        var UploadCtrl = require("./controllers/uploadCtrl");
        $injector.invoke(UploadCtrl, this, {'$scope': $scope, 'uploadedTracks': uploadedTracks});
    })

    .controller('UploadViewCtrl', function ($scope, $injector, uploadedTracks) {
        var UploadViewCtrl = require("./controllers/uploadViewCtrl");
        $injector.invoke(UploadViewCtrl, this, {'$scope': $scope, 'uploadedTracks': uploadedTracks});
    })

    .controller('ViewTrackCtrl', function ($scope, $injector) {
        var ViewTrackCtrl = require("./controllers/viewTrackCtrl");
        $injector.invoke(ViewTrackCtrl, this, {'$scope': $scope});
    });