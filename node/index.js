"use strict";

var server = require("./web-server/web-server");
var requestHandlers = require("./web-server/requestHandlers");

var handlers = {
    "/upload": requestHandlers.upload,
    "/viewTrack": requestHandlers.viewTrack
};

server.start(handlers);