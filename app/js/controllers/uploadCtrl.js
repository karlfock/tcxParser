"use strict";

var Track = require("../lib/track");

module.exports = function($scope, $upload, $location, $route, uploadedTracks, $q) {

    var numUploads, uploaded = 0, failed = 0;

    $scope.onFileSelect = function($files) {
        numUploads = $files.length;

        uploadedTracks.clear();

        for (var i = 0; i < numUploads; i++) {

            var file = $files[i];
            $scope.upload = $upload.upload({
                url: 'upload',
                file: file
            }).progress(
                function(evt) {
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                }).success(function(data, status, headers, config) {
                uploaded++;

                console.log("upload finished: ", data);

                uploadedTracks.addTrack(Track.create(data));

                if ($location.path() === "/uploadView") {
                    $route.reload();
                } else {
                    $location.path("/uploadView");
                }
            }).error(function(errorMsg, errorCode, headersGetter, data) {
                failed++;

                console.log("Error uploading file: ", data.file.name);
                uploadedTracks.addUploadFailedInfo(data.file.name);
            });
        }

        waitForUploads().then(function(data) {
            console.log('Success: ' + data);
            uploadedTracks.serialize();
        }, function(reason) {
            console.log('Failed: ' + reason);
        });

    };

    function waitForUploads() {
        var deferred = $q.defer(), id, finishedUploads;
        try {
            id = setInterval(function() {
                finishedUploads = uploaded + failed;

                if (finishedUploads === numUploads) {
                    deferred.resolve("All uploads finished");
                    clearInterval(id);
                }
            }, 500);
        } catch (e) {
            deferred.reject(e);
            clearInterval(id);
        }
        return deferred.promise;
    }

};