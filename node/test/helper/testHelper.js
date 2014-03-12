"use strict";

var fs = require("fs"),
    TcxParser = require("../../lib/tcxParser.js");

function TestHelper() {
    this.tcxParser = TcxParser.create("trackId");
    this.tcxXml = fs.readFileSync("./test/resources/test.tcx", "utf8");

    // this file fails...
    this.tcxXml2 = fs.readFileSync("./test/resources/test2.tcx", "utf8");
}


module.exports.create = function () {
    return new TestHelper();
}