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
});