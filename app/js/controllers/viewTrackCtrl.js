"use strict";

var Track = require("../lib/track").Track, track;

module.exports = function ($scope, $routeParams, uploadedTracks, $http) {
    // get track from uploaded list from this session

    var trackId = $routeParams.trackId;
    var track = uploadedTracks.getTrackById(trackId);

    $scope.idInUrl = trackId

    if (track) {
        console.log("get track from uploaded this session");
        $scope.track = {
            origin: "uploaded this session",
            id: track.id,
            date: track.getTrackSummary().getDate(),
            distanceInKm: track.getTrackSummary().getDistanceInKm()
        };
    } else {
        console.log("get track server");
        // otherwise get from db/file server
        $http({method: 'GET', url: '/viewTrack/?trackId=' + trackId}).
            success(function (data, status, headers, config) {
                debugger;
                console.log("got track from server:", data);

                track = new Track(data)

                $scope.track = {
                    origin: "retrieved from server",
                    id: track.id,
                    date: track.getTrackSummary().getDate(),
                    distanceInKm: track.getTrackSummary().getDistanceInKm()
                };
            }).
            error(function (data, status, headers, config) {
                debugger;
                console.log(data);

                $scope.track = {
                    origin: "file with id: " + trackId + " not found on server"
                };

            });
    }
};
