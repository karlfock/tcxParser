"use strict";

var moment = require("moment");

function UploadedTracks() {
    this._failedUploads = [];
    this._tracks = [];
}

UploadedTracks.prototype.clear = function () {
    this._failedUploads = [];
    this._tracks = [];
}

// TODO: type check
UploadedTracks.prototype.addTrack = function (track) {
    this._tracks.push(track);
};

UploadedTracks.prototype.getTracksSummary = function () {
    var tracks = this._tracks.map(function (track) {
        return {
            id: track.id,
            date: track.getTrackSummary().getDate(),
            distanceInKm: track.getTrackSummary().getDistanceInKm()
        };
    });

    tracks.sort(function (a, b) {
        return moment(a.date).diff(moment(b.date));
    });
    return tracks;
};

UploadedTracks.prototype.getTrackById = function (id) {
    try {
        return this._tracks.filter(function (track) {
            return track.id === id;
        })[0];
    } catch (e) {
        return null;
    }
};

UploadedTracks.prototype.addUploadFailedInfo = function (fileName) {
    this._failedUploads.push({
        fileName: fileName
    });
};

UploadedTracks.prototype.getUploadedFailedInfo = function () {
    return this._failedUploads;
}

exports.UploadedTracks = UploadedTracks;