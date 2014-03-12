"use strict";

var moment = require("moment");

function TrackSearcher(track) {
    this.track = track;
    this.trackPoints = this.track.getTrackPoints();
    this.tpLength = this.track.getTpLength();

    this.startPoint = null;
    this.endPoint = null;

    this.pointBeforeTarget = null;
    this.distanceBeforeTarget = null;

    this.pointAfterTarget = null;
    this.distanceAfterTarget = null;
}

TrackSearcher.prototype.getFastestSubTrackByDistance = function (targetDistance) {
    var fastestSubTrackInfo = null,
        maxSpeed = 0,
        speed,
        startIndex, endIndex;

    if (targetDistance >= this.track.getLastTrackPoint().distanceMeters) {
        return this.trackPoints;
    }
    if (targetDistance <= 0) {
        return [];
    }

    for (startIndex = 0; startIndex < this.tpLength; startIndex++) {
        this.startPoint = this.trackPoints[startIndex];
        for (endIndex = startIndex + 1; endIndex < this.tpLength; endIndex++) {

            if (this._isTargetReached(targetDistance, endIndex)) {

                this._setEndPointClosestToTarget(targetDistance, endIndex);

                speed = this._calculateSpeed();

                if (speed > maxSpeed) {
                    maxSpeed = speed;

                    fastestSubTrackInfo = {
                        from: this.startPoint.trackPointId,
                        to: this.endPoint.trackPointId
                    };
                }
                break;
            }
        }
    }

    return this.track.createSubTrack(fastestSubTrackInfo);
};

TrackSearcher.prototype._isTargetReached = function (targetDistance, endIndex) {
    this.pointAfterTarget = this.trackPoints[endIndex];
    this.distanceAfterTarget = this.pointAfterTarget.distanceMeters - this.startPoint.distanceMeters;
    return this.distanceAfterTarget > targetDistance;
};

TrackSearcher.prototype._setEndPointClosestToTarget = function (targetDistance, endIndex) {
    var dist1, dist2;

    this.pointBeforeTarget = this.trackPoints[endIndex - 1];
    this.distanceBeforeTarget = this.pointBeforeTarget.distanceMeters - this.startPoint.distanceMeters;
    dist1 = -(this.distanceBeforeTarget - targetDistance);
    dist2 = this.distanceAfterTarget - targetDistance;

    if (dist2 >= dist1) {
        this.endPoint = this.pointBeforeTarget;
    } else {
        this.endPoint = this.pointAfterTarget;
    }
};

TrackSearcher.prototype._calculateSpeed = function () {
    var distanceMeters = this.endPoint.distanceMeters - this.startPoint.distanceMeters,
        timeMs = moment(this.endPoint.time).diff(moment(this.startPoint.time));
    return distanceMeters / (timeMs / 1000);
};

TrackSearcher.prototype.getNextPoint = function (trackPoint) {
    var nextPoint;
    if (!("trackPointId" in trackPoint)) {
        throw new Error("Missing required property: trackPointId");
    }
    try {
        nextPoint = this.trackPoints[trackPoint.trackPointId + 1];
    } catch (e) {
        return null;
    }
    return nextPoint;
};

module.exports.create = function  (track) {
    // TODO: type check
    return new TrackSearcher(track);
}
