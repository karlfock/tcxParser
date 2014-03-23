"use strict";

var fs = require("fs"),
    TcxParser = require("./tcxParser");

function TrackStorage() {
}

TrackStorage.prototype.getTrackById = function (trackId, callback, errCallback) {

    // TODO: get from db...
    this.getTrackFromFile(trackId, callback, errCallback);

};

TrackStorage.prototype.getTrackFromFile = function (trackId, callback, errCallback) {


    var path = "./uploaded/" + trackId;

    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log("getTrackFromFile: file not found", path);
            errCallback();
        }
        if (data) {
            console.log("got file by id: ", data.substring(0, 300), "...");

            var tcxParser = TcxParser.create(trackId);
            tcxParser.parse(data, function (track) {
                callback(track);
            });
        }
    });
};

module.exports.create = function () {
    return new TrackStorage();
};
