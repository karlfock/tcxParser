var path = require('path');
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



    it('should upload single file', function() {
        var fileToUpload = '../../node/test/resources/test.tcx';
        var absolutePath = path.resolve(__dirname, fileToUpload);
        var uploaded = $('input[type="file"]').sendKeys(absolutePath);


        // TODO: how to verify upload? clean up file
        // select a href=#/viewTrack/eb9bc810-ac90-11e3-93a3-af46be910176
        // to get id of uploaded
        var link = $(".trackLink"); // some kind of promise object...


        // console.log("****** typeof link:", link.getTagName());

        var currentUrl;
        browser.getCurrentUrl().then(function(url) {
            currentUrl = url;
        }).then(function() {
            return browser.wait(function() {
                return browser.getCurrentUrl().then(function(url) {
                    console.log("*** url:", url);
                    return url !== currentUrl;
                });
            });
        }).then(function() {
            console.log("*** continue testing");
        });

        expect(true).toEqual(true);



    });
});