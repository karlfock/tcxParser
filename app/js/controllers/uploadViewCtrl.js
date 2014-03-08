define(["moment"], function (moment) {
    return ['$scope', 'trackService', function ($scope, trackService) {
        $scope.tracks = trackService.getTracksSummary();
        $scope.$apply();
    }];
});