"use strict";

var dummy = require("../../app/js/lib/dummy");

describe('Dummy', function () {
    describe('getDummy()', function () {
        it("should return dummy", function () {
            expect(dummy).toEqual("dummy");
        });
    });
});