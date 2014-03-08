(function() {
    "use strict";

    var fs = require("fs"),
        TcxParser = require("../../lib/tcxParser.js").TcxParser;

    function TestHelper() {
        this.tcxParser = new TcxParser();
        this.tcxXml = fs.readFileSync("./test/resources/test.tcx", "utf8");

        // this file fails...
        this.tcxXml2 = fs.readFileSync("./test/resources/test2.tcx", "utf8");
    }

    exports.TestHelper = TestHelper;

})();
