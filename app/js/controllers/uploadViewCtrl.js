"use strict";
//require("moment");

module.exports  = ['$scope', 'trackService', '$location', function ($scope, trackService, $location) {
    var tracks = trackService.getTracksSummary();
    if(tracks.length > 0) {
        $scope.tracks = tracks;
    } else {
        $location.path("/");
    }

}];

