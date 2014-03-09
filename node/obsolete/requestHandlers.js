var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    moment = require("moment"),
    TcxParser = require("./../lib/tcxParser.js").TcxParser,
    tmpFilePath = "./uploaded/uploaded" + moment().format("YYYY-MM-DDTHH-mm-ss");

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' +
        'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");

        /* Possible error on Windows systems:
             tried to rename to an already existing file */
        fs.rename(files.upload.path, tmpFilePath, function(err) {
            if (err) {
                fs.unlink(tmpFilePath);
                fs.rename(files.upload.path, tmpFilePath);
            }
        });
        response.writeHead(200, {
            "Content-Type": "text/html"
        });
        response.write("uploaded file:<br/>");

        fs.readFile(tmpFilePath, 'utf8', function(err, data) {
            if (err) {
                console.log("there was an error: ", err);
            }
            console.log("got data");
            response.write("got data: " + data);


            // TODO: we got the tcx file. parse it. or just return it
            // and let all the work be done on the web with web workers?

            var tcxParser = new TcxParser(data);
            tcxParser.parse(data, function(track) {
                var i = 0;

            });



            response.end();
        });

    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.createReadStream(tmpFilePath).pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;