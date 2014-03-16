var path = require('path'),
    fs = require('fs');

describe('angularjs homepage', function() {

    var ptor;

    beforeEach(function() {
        ptor = protractor.getInstance();

        // Fix for doubble bootstrap problem, I think...
        ptor.ignoreSynchronization = true;
    });

    it('should greet the named user', function() {
        browser.get('/index.html');

        // Find the element with ng-model matching 'firstName' - this will
        // find the <input type="text" ng-model="firstName"/> element - and then
        // type 'Julie' into it.
        element(by.model('firstName')).sendKeys('Julie');

        // Find the element with binding matching 'firstName' - this will
        // find the <h1>Hello {{firstName}}!</h1> element.
        var greeting = element(by.binding('firstName'));

        // Assert that the text element has the expected value.
        // Protractor patches 'expect' to understand promises.
        expect(greeting.getText()).toEqual('Hello Julie!');
    });



    it('should upload single file and save in upload foler', function() {
        var fileToUpload = '../../node/test/resources/test.tcx',
            absolutePath = path.resolve(__dirname, fileToUpload),
            uploaded = $('input[type="file"]').sendKeys(absolutePath),
            currentUrl;

        browser.getCurrentUrl().then(function(url) {
            currentUrl = url;
        }).then(function() {
            return browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    console.log("Wait for url to change to /uploadView:", url);
                    return url !== currentUrl;
                });
            });
        }).then(function() {
            var link = $('.trackLink');
            console.log("Verify that uploaded file exists");

            link.getAttribute("id").then(function(id) {

                var uploadedFilePath = path.resolve(__dirname, "../../uploaded", id);
                console.log("File path of uploaded file:", uploadedFilePath);

                fs.exists(uploadedFilePath, function(exists) {
                    console.log("File exists: ", exists);
                    expect(exists).toEqual(true);
                });

            });
        });
    });
});