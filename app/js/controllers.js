"use strict";

require("../../bower_components/angular/angular.js");
require("../../bower_components/ng-file-upload/angular-file-upload.js");
require("./services.js");


angular.module('myApp.controllers', ['myApp.services', 'angularFileUpload'])

    .controller('UploadCtrl', ['$scope', '$injector', 'uploadedTracks', function ($scope, $injector, uploadedTracks) {
        var UploadCtrl = require("./controllers/uploadCtrl");
        $injector.invoke(UploadCtrl, this, {'$scope': $scope, 'uploadedTracks': uploadedTracks});
    }])

    .controller('UploadViewCtrl', ['$scope', '$injector', 'uploadedTracks', function ($scope, $injector, uploadedTracks) {
        var UploadViewCtrl = require("./controllers/uploadViewCtrl.js");
        $injector.invoke(UploadViewCtrl, this, {'$scope': $scope, 'uploadedTracks': uploadedTracks});
    }]);