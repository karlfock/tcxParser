"use strict";

var formidable = require("formidable"),
    TcxParser = require("./lib/tcxParser"),
    TrackStorage = require("./lib/trackStorage"),
    uuid = require("node-uuid"),
    fs = require("fs");


function upload(request, response) {

    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm(),
        trackId = uuid.v1(),
        tmpFilePath = "./uploaded/" + trackId;

    console.log("about to parse, form");

    form.on("progress", function(bytesReceived, bytesExpected) {
        var progress = {
            type: "progress",
            bytesReceived: bytesReceived,
            bytesExpected: bytesExpected
        };
        console.log("upload progress", progress);
        // TODO: use socket.io on client and server to show progress

        //        socket.broadcast(JSON.stringify(progress));
    });

    form.parse(request, function(error, fields, files) {
        console.log("parsing done");

        /* Possible error on Windows systems:
         tried to rename to an already existing file */

        var uploadedFile = files.file._writeStream.path;
        console.log("uploaded file path:", uploadedFile);


        fs.rename(uploadedFile, tmpFilePath, function(err) {
            if (err) {
                fs.unlink(tmpFilePath);
                fs.rename(files.upload.path, tmpFilePath);
            }
            console.log("copied uploaded file to: ", tmpFilePath);
        });
        response.writeHead(200, {
            "Content-Type": "text/html"
        });

        fs.readFile(tmpFilePath, "utf8", function(err, data) {
            if (err) {
                console.log("there was an error: ", err);
                response.writeHead(500);
                response.write("Error uploading file");
                response.end();

            } else {

                if (data && data.length > 100) {
                    console.log("got data:", data.substring(0, 100), "...");
                }

                var tcxParser = TcxParser.create(trackId);
                tcxParser.parse(data, function(track) {

                    response.write(JSON.stringify(track));
                    response.end();
                });
            }
        });
    });
}

function viewTrack(request, response) {
    var trackStorage;

    var trackId = request.url.query.trackId;
    if (trackId) {
        console.log("viewTrack request handler called with trackId: ", trackId);
    } else {
        console.log("viewTrack called without trackId");
    }

    // get track by id, from file or db or whatever
    trackStorage = TrackStorage.create();
    trackStorage.getTrackById(trackId, function(track) {
        console.log("got track by id, sending response...");
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write(JSON.stringify(track));
        response.end();
    }, function() {
        console.log("Error callback: file not found");
        response.writeHead(500, {
            "Content-Type": "text/html"
        });
        response.write("File with id " + trackId + " not found");
        response.end();
    });


}

exports.upload = upload;
exports.viewTrack = viewTrack;