var TestHelper = require("../helper/testHelper").TestHelper,
    testHelper = new TestHelper(),
    tcxXml = testHelper.tcxXml,
    tcxParser = testHelper.tcxParser;

tcxParser.parse(tcxXml, function (track) {
    console.log("module.exports = " + JSON.stringify(track) + ";");
});