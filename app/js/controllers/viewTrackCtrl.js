"use strict";

module.exports = function ($scope, $routeParams, uploadedTracks, $http) {
    // get track from uploaded list from this session

    var trackId = $routeParams.trackId;
    var track = uploadedTracks.getTrackById(trackId);

    $scope.idInUrl = trackId

    if (track) {
        $scope.track = {
            id: track.id,
            date: track.getTrackSummary().getDate(),
            distanceInKm: track.getTrackSummary().getDistanceInKm()
        };
    } else {

        // otherwise get from db/file server
        $http({method: 'GET', url: '/viewTrack/?trackId=' + trackId}).
            success(function (data, status, headers, config) {
                debugger;
            }).
            error(function (data, status, headers, config) {
                debugger;
            });
    }
};
