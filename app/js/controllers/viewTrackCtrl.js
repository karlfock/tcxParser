"use strict";

var Track = require("../lib/track"),
    track;

module.exports = function($scope, $routeParams, uploadedTracks, $http) {
    // get track from uploaded list from this session

    var trackId = $routeParams.trackId;
    var track = uploadedTracks.getTrackById(trackId);


    if (track) {
        console.log("get track uploaded this session");
        // $scope.trackInfo = createTrackInfo(track, "uploaded this session");
        $scope.message = "uploaded this session"
        $scope.trackSummary = track.getTrackSummary();
        
    } else {
        console.log("get track from server");
        // otherwise get from db/file server
        $http({
            method: 'GET',
            url: '/viewTrack/?trackId=' + trackId
        }).
        success(function(data, status, headers, config) {
            console.log("got track from server:", data);

            track = Track.create(data);

            $scope.message = "retrieved from server";
            $scope.trackSummary = track.getTrackSummary();
        }).
        error(function(data, status, headers, config) {
            console.log(data);
            $scope.message = "file with id: " + trackId + " not found on server";
        });
    }
};