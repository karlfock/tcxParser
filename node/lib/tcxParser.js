"use strict";

var parseString = require("xml2js").parseString,
    trackPointId;

function TcxParser(trackId) {
    this.trackId = trackId;
}

TcxParser.prototype.parse = function(tcxXml, callback) {
    var trackId = this.trackId;

    trackPointId = 0;

    parseString(tcxXml, function(err, result) {
        var activity = result.TrainingCenterDatabase.Activities[0].Activity[0];

        var tcxData = {
            id: trackId,
            date: activity.Id[0],

            // map the structure to don"t have arrays with just one element, 
            // as in the original xml.
            laps: activity.Lap.map(function(lap, lapIndex) {
                return {
                    startTime: lap.$.StartTime,
                    calories: lap.Calories[0],
                    distanceMeters: lap.DistanceMeters[0],
                    intensity: lap.Intensity[0],
                    maximumSpeed: lap.MaximumSpeed[0],
                    totalTimeSeconds: lap.TotalTimeSeconds[0],
                    trackPoints: getTrackPointsFromLap(lap, lapIndex),
                    triggerMethod: lap.TriggerMethod[0]
                };
            })
        };

        callback(tcxData);
    });
};


function getTrackPointsFromLap(lap, lapIndex) {
    return lap.Track[0].Trackpoint.map(function(tp) {
        return {
            lapId: lapIndex,
            trackPointId: trackPointId++,
            altitudeMeters: tp.AltitudeMeters ? tp.AltitudeMeters[0] : null,
            distanceMeters: tp.DistanceMeters ? tp.DistanceMeters[0] : null,
            position: tp.Position ? {
                latitudeDegrees: tp.Position[0].LatitudeDegrees[0],
                longitudeDegress: tp.Position[0].LongitudeDegrees[0]

            } : null,
            sensorState: tp.SensorState ? tp.SensorState[0] : null,
            time: tp.Time ? tp.Time[0] : null
        };
    });
}


module.exports.create = function  (trackId) {
    return new TcxParser(trackId);
};