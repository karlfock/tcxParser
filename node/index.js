'use strict';

var requestHandlers = require('./requestHandlers');
var path = require('path');
var express = require('express');
var app = express();

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.url);
    next();
});

app.post('/upload', function(req, res) {
    requestHandlers.upload(req, res);
});

app.post('/viewTrack', function(req, res) {
    requestHandlers.viewTrack(req, res);
});

var staticFiles = path.resolve(__dirname, '..');

app.use(express.static(staticFiles));

app.listen(8000);





