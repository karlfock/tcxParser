"use strict";
require("../../bower_components/angular/angular.js");

angular.module('myApp.services', []).value('version', '0.1')
    .service('uploadedTracks', function() {
        var UploadedTracks = require("./lib/uploadedTracks.js").UploadedTracks;
        return new UploadedTracks();
    });