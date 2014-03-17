"use strict";
/* global browser, require, console, describe, 
   protractor, beforeEach, it, expect, $, __dirname */

var path = require("path"),
    fs = require("fs");

describe("angularjs homepage", function() {

    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();

        // Fix for doubble bootstrap problem, I think...
        ptor.ignoreSynchronization = true;

        browser.get("/index.html");

    });

    function waitForUrlChange() {
        var currentUrl;
        return browser.getCurrentUrl().then(function(url) {
            currentUrl = url;
        }).then(function() {
            return browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    console.log("Current url:", url);
                    return url !== currentUrl;
                });
            });
        });
    }


    it("should upload single file and save in upload foler", function() {
        var fileToUpload = "../../node/test/resources/test.tcx",
            absolutePath = path.resolve(__dirname, fileToUpload);

        $("input[type='file']").sendKeys(absolutePath);

        console.log("Wait for url to change to /uploadView");

        waitForUrlChange().then(function() {
            var link = $(".trackLink");
            console.log("Verify that uploaded file exists");

            link.getAttribute("id").then(function(id) {

                var uploadedFilePath = path.resolve(__dirname, "../../uploaded", id);
                console.log("File path of uploaded file:", uploadedFilePath);

                fs.exists(uploadedFilePath, function(exists) {
                    console.log("File exists:", exists);
                    expect(exists).toEqual(true);
                });

            });
        });
    });
});