"use strict";

var moment = require("moment"),
    Track = require("../lib/track");


function UploadedTracks() {
    this._failedUploads = [];
    this._tracks = [];
}

UploadedTracks.prototype.clear = function() {
    this._failedUploads = [];
    this._tracks = [];
};

// TODO: type check
UploadedTracks.prototype.addTrack = function(track) {
    this._tracks.push(track);
};

UploadedTracks.prototype.serialize = function() {
    sessionStorage.setItem("tcxParser.tracks", JSON.stringify(this._tracks));
};

UploadedTracks.prototype.getTracksSummary = function() {
    var tracks = this.getTracks().map(function(track) {
        return track.getTrackSummary();
    });

    tracks.sort(function(a, b) {
        return moment(a.date).diff(moment(b.date));
    });
    return tracks;
};

UploadedTracks.prototype.getTrackById = function(id) {
    try {
        return this.getTracks().filter(function(track) {
            return track.id === id;
        })[0];
    } catch (e) {
        return null;
    }
};

UploadedTracks.prototype.getTracks = function() {
    if (this._tracks.length === 0) {
        this._tracks = this._getTracksFromSessionStorage();
    }
    return this._tracks;
};

UploadedTracks.prototype._getTracksFromSessionStorage = function() {
    var tracks = sessionStorage.getItem("tcxParser.tracks");
    if (tracks) {
        tracks = JSON.parse(tracks);
        console.log("Got", tracks.length, "tracks from session");

        return tracks.map(function (track) {
            return Track.create(track);
        });
    }
    return [];
};


UploadedTracks.prototype.addUploadFailedInfo = function(fileName) {
    this._failedUploads.push({
        fileName: fileName
    });
};

UploadedTracks.prototype.getUploadedFailedInfo = function() {
    return this._failedUploads;
};

module.exports.create = function() {
    return new UploadedTracks();
};