"use strict";
require("../../bower_components/angular/angular.js");

angular.module('myApp.services', []).value('version', '0.1')
    .service('trackService', function () {
        var uploadedTracksModule = require("./lib/uploadedTracks.js"),
            uploadedTracks = new uploadedTracksModule.UploadedTracks();

        return {
            clear: function () {
                uploadedTracks.clear();
            },
            getTracksSummary: function () {
                return uploadedTracks.getTracksSummary();

            },
            addTrack: function (value) {
                uploadedTracks.addTrack(value);
            }
        }
    });