"use strict";

var moment = require("moment");

function UploadedTracks() {
    this._tracks = [];
}

UploadedTracks.prototype.clear = function () {
    this._tracks = [];
}

// TODO: type check
UploadedTracks.prototype.addTrack = function (track) {
    this._tracks.push(track);
};

UploadedTracks.prototype.getTracksSummary = function () {
    var tracks = this._tracks.map(function (track) {
        return {
            date: track.getTrackSummary().getDate(),
            distanceInKm: track.getTrackSummary().getDistanceInKm()
        };
    });

    tracks.sort(function (a, b) {
        return moment(a.date).diff(moment(b.date));
    });
    return tracks;
};

exports.UploadedTracks = UploadedTracks;