"use strict";

module.exports  = ['$scope', 'uploadedTracks', '$location', function ($scope, uploadedTracks, $location) {
    var tracks = uploadedTracks.getTracksSummary(),
        failedUploads = uploadedTracks.getUploadedFailedInfo();

    if(tracks.length > 0 || failedUploads.length > 0) {
        $scope.failedUploads = failedUploads;
        $scope.tracks = tracks;
    } else {
        $location.path("/");
    }

}];

