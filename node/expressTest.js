(function () {
    "use strict";


    var express = require('express');
    var app = express();

    console.log("cur dir:", process.cwd());

    app.set('views', process.cwd());
    app.engine('html', require('ejs').renderFile);

    app.get('/', function (req, res) {
        res.render('index.html');
    });

    app.get('/lib/track.js', function (req, res) {
        res.render('got js file');
    });







    app.listen(3000);
    console.log('Listening on port 3000');


})();