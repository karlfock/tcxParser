/**
 * Generate a AMD module which returns the JSON test data generated by parsing test.tcx xml.
 *
 */

var TestHelper = require("../helper/testHelper").TestHelper,
    testHelper = new TestHelper(),
    tcxXml = testHelper.tcxXml,
    tcxParser = testHelper.tcxParser;

tcxParser.parse(tcxXml, function (track) {
    console.log("" +
        "define([], function() {" +
            "return " + JSON.stringify(track) + ";" +
        "});"
    );
});