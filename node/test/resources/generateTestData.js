"use strict";

var TestHelper = require("../helper/testHelper"),
    testHelper = TestHelper.create(),
    tcxXml = testHelper.tcxXml,
    tcxParser = testHelper.tcxParser;

tcxParser.parse(tcxXml, function (track) {
    console.log("module.exports = " + JSON.stringify(track) + ";");
});