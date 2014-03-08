// we get all the test files automatically
var tests = [];
// karma paths starts with /base, so the paths have to start with /base/...
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/i.test(file)) {
            tests.push(file);
        }
    }
}

//tests = ["/base/test/unit/controllersSpec.js"];
//tests = ["/base/test/unit/servicesSpec.js"];
//tests = ["/base/test/unit/filtersSpec.js"];
//tests = ["/base/test/unit/directivesSpec.js"];


require.config({
    paths: {
        angular: '/base/bower_components/angular/angular',
        angularRoute: '/base/bower_components/angular-route/angular-route',
        angularMocks: '/base/bower_components/angular-mocks/angular-mocks',
        angularFileUpload: '/base/bower_components/ng-file-upload/angular-file-upload',
        text: '/base/bower_components/requirejs-text/text',
        moment: '/base/bower_components/moment/moment',
        fixtures: '/base/test/unit/fixtures',
        baseTestUrl: '/base/test'

    },
    baseUrl: '/base/app/js',
    shim: {
        'angular' : {'exports' : 'angular'},
        'angularRoute': ['angular'],
        'angularMocks': {
            deps:['angular'],
            'exports':'angular.mock'
        },
        'angularFileUpload': {
            'exports': 'angularFileUpload'
        }
    },
    deps: tests,
    callback: window.__karma__.start
});
