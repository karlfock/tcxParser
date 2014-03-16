"use strict";

var Track = require("../lib/track"),
    track;

module.exports = function($scope, $routeParams, uploadedTracks, $http) {
    // get track from uploaded list from this session

    var trackId = $routeParams.trackId;
    var track = uploadedTracks.getTrackById(trackId);

    if (track) {
        console.log("get track uploaded this session");
        $scope.trackInfo = {
            message: "uploaded this session",
            track: {
                id: track.id,
                date: track.getTrackSummary().getDate(),
                distanceInKm: track.getTrackSummary().getDistanceInKm()
            }
        };
    } else {
        console.log("get track from server");
        // otherwise get from db/file server
        $http({
            method: 'GET',
            url: '/viewTrack/?trackId=' + trackId
        }).
        success(function(data, status, headers, config) {
            console.log("got track from server:", data);

            track = Track.create(data)

            $scope.trackInfo = {
                message: "retrieved from server",
                track: {
                    id: track.id,
                    date: track.getTrackSummary().getDate(),
                    distanceInKm: track.getTrackSummary().getDistanceInKm()
                }
            };
        }).
        error(function(data, status, headers, config) {
            console.log(data);

            $scope.trackInfo = {
                message: "file with id: " + trackId + " not found on server"
            };

        });
    }
};