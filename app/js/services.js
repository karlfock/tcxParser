"use strict";

var UploadedTracks = require("./lib/uploadedTracks");
require("../../bower_components/angular/angular");


angular.module('myApp.services', []).value('version', '0.1')
    .service('uploadedTracks', function() {
        return UploadedTracks.create();
    });