define(['angular', 'lib/uploadedTracks'], function (angular, UploadedTracks) {
	'use strict';

  // Demonstrate how to register services
  // In this case it is a simple value service.
	var app = angular.module('myApp.services', []).value('version', '0.1');


    app.service('trackService', function() {
        var uploadedTracks = new UploadedTracks();

        return {
            clear: function  () {
                uploadedTracks.clear();
            },
            getTracksSummary: function() {
                return uploadedTracks.getTracksSummary();

            },
            addTrack: function(value) {
                uploadedTracks.addTrack(value);
            }
        }
    });

});
