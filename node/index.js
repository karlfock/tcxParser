"use strict";

var server = require("./web-server/web-server");
var requestHandlers = require("./web-server/requestHandlers");

var handlers = {
    "/upload": requestHandlers.upload
};

server.start(handlers);