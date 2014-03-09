"use strict";

var track = require("../lib/track");

module.exports = [ '$scope', '$upload', '$location', '$route', 'uploadedTracks',
    function ($scope, $upload, $location, $route, uploadedTracks) {

        $scope.onFileSelect = function ($files) {

            uploadedTracks.clear();

            for (var i = 0; i < $files.length; i++) {

                var file = $files[i];
                $scope.upload = $upload.upload({
                    url: 'upload',
                    file: file
                }).progress(
                    function (evt) {
                        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));

                    }).success(function (data, status, headers, config) {

                        console.log("upload finished: ", data);

                        uploadedTracks.addTrack(new track.Track(data));

                        if ($location.path() === "/uploadView") {
                            $route.reload();
                        } else {
                            $location.path("/uploadView");
                        }
                    }).error(function (errorMsg, errorCode, headersGetter, data) {
                        console.log("Error uploading file: ", data.file.name);
                        uploadedTracks.addUploadFailedInfo(data.file.name);
                    });
            }
        };
    }];
