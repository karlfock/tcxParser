"use strict";
/* global console, require, module */

var Track = require("../lib/track");

function ViewTrackCtrl($scope, $routeParams, uploadedTracks, $http) {
    this.$scope = $scope;
    this.$http = $http;
    this.trackId = $routeParams.trackId;
    this.track = uploadedTracks.getTrackById(this.trackId);
}

ViewTrackCtrl.prototype = {
    init: function() {
        if (this.track) {
            console.log("get track uploaded this session");
            this.viewTrack("uploaded this session");

        } else {
            this.getTrackRemote();
        }
    },
    getTrackRemote: function() {
        var self = this; // TODO: bind "this" to functions instead?
        console.log("get track from server");
        this.$http({
            method: "GET",
            url: "/viewTrack/?trackId=" + this.trackId
        }).
        success(function(data) {
            console.log("got track from server:", data);
            self.track = Track.create(data);
            self.viewTrack("retrieved from server");
        }).
        error(function(data) {
            console.log(data);
            self.viewTrack("file with id: " + self.trackId + " not found on server");
        });
    },
    viewTrack: function(message) {
        this.$scope.message = message;
        if (this.track) {
            this.$scope.trackSummary = this.track.getTrackSummary();
        }
    }
};

module.exports = function($scope, $routeParams, uploadedTracks, $http) {
    var viewTrackCtrl = new ViewTrackCtrl($scope, $routeParams, uploadedTracks, $http);
    viewTrackCtrl.init();
};