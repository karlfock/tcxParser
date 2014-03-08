"use strict";

var track = require("../lib/track");

module.exports = [ '$scope', '$upload', '$location', '$route', 'trackService',
    function ($scope, $upload, $location, $route, trackService) {

        $scope.onFileSelect = function ($files) {

            trackService.clear();

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

                        trackService.addTrack(new track.Track(data));

                        if ($location.path() === "/uploadView") {
                            $route.reload();
                        } else {
                            $location.path("/uploadView");
                        }
                    }).error(function () {
                        console.log("Error uploading file");
                    });
            }
        };
    }];
