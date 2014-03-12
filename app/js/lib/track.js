"use strict";

var moment = require("moment");

function Track(trackData) {
    this.id = trackData.id;
    this.laps = trackData.laps;
    this._date = trackData.date;
    this._trackPoints = null;
    this._tpLength = null;
    this._trackSummary = null;
}

Track.prototype.getTrackPoints = function() {
    if (!this._trackPoints) {
        this._trackPoints = this.laps.reduce(function(prev, curr, idx) {
            return prev.concat(curr.trackPoints);
        }, []);
    }
    this._tpLength = this._trackPoints.length;
    return this._trackPoints;
};

Track.prototype.getTpLength = function() {
    if (!this._tpLength) {
        return this.getTrackPoints().length;
    }
    return this._tpLength;
};

Track.prototype.createSubTrack = function(param) {
    var subTrack = [],
        i, tpLength = this.getTpLength(),
        from = param.from,
        to = param.to;

    if (from >= 0 && from <= tpLength &&
        to >= 0 && to <= tpLength &&
        to >= from) {

        for (i = from; i <= to; i++) {
            subTrack.push(this.getTrackPoints()[i]);
        }
    }

    return subTrack;
};

Track.prototype.getLastTrackPoint = function() {
    // last track point contains time only, thus subtracting 2.
    return this.getTrackPoints()[this.getTpLength() - 2];
};

Track.prototype.getTrackSummary = function() {


    if (!this._trackSummary) {

        var lastTrackPoint = this.getLastTrackPoint(),
            trackDate = this._date;

        this._trackSummary = {
            getDistanceInKm: function(decimals) {
                decimals = decimals || 1;
                var kms = lastTrackPoint.distanceMeters / 1000,
                    truncBase = Math.pow(10, decimals);
                return Math.round(kms * truncBase) / truncBase;
            },
            getDate: function(format) {
                format = format || "YYYY-MM-DD";
                return moment(trackDate).format(format);

            }
        };
    }

    return this._trackSummary;

};

Track.prototype.getId = function() {
    return this.id;
};

module.exports.create = function(trackData) {
    return new Track(trackData);
};