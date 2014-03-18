"use strict";

var Track = require("../lib/track");


module.exports = function($scope, $upload, $location, $route, uploadedTracks, $q) {

    var numUploads, uploaded = 0,
        failed = 0;

    $scope.onFileSelect = function($files) {
        numUploads = $files.length;

        uploadedTracks.clear();

        for (var i = 0; i < numUploads; i++) {
            upload($scope, $files[i]);
        }

        waitForUploads().then(function(data) {
            console.log("Success: " + data);
            uploadedTracks.serialize();
        }, function(reason) {
            console.log("Failed: " + reason);
        });

    };

    function upload($scope, file) {

        $scope.upload = $upload.upload({
            url: "upload",
            file: file
        }).success(function(data) {
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

    function waitForUploads() {
        var deferred = $q.defer(),
            id, finishedUploads;
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