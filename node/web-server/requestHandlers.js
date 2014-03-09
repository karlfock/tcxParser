var formidable = require("formidable"),
    moment = require("moment"),
    TcxParser = require("./../lib/tcxParser").TcxParser,
    uuid = require('node-uuid'),
    fs = require('fs');


function upload(request, response) {

    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm(),
        tmpFilePath = "./uploaded/uploaded" + moment().format("YYYY-MM-DDTHH-mm") + "-" + uuid.v1();

    console.log("about to parse, form");

    form.on('progress', function (bytesReceived, bytesExpected) {
        var progress = {
            type: 'progress',
            bytesReceived: bytesReceived,
            bytesExpected: bytesExpected
        };
        console.log("upload progress", progress);
        // TODO: use socket.io on client and server to show progress

//        socket.broadcast(JSON.stringify(progress));
    });

    form.parse(request, function (error, fields, files) {
        console.log("parsing done");

        /* Possible error on Windows systems:
         tried to rename to an already existing file */

        var uploadedFile = files.file._writeStream.path;
        console.log("uploaded file path:", uploadedFile);


        fs.rename(uploadedFile, tmpFilePath, function (err) {
            if (err) {
                fs.unlink(tmpFilePath);
                fs.rename(files.upload.path, tmpFilePath);
            }
            console.log("copied uploaded file to: ", tmpFilePath);
        });
        response.writeHead(200, {
            "Content-Type": "text/html"
        });

        fs.readFile(tmpFilePath, 'utf8', function (err, data) {
            if (err) {
                console.log("there was an error: ", err);
                response.writeHead(500);
                response.write("Error uploading file");
                response.end();

            } else {

                if (data && data.length > 100) {
                    console.log("got data:", data.substring(0, 100), "...");
                }

                var tcxParser = new TcxParser(data);
                tcxParser.parse(data, function (track) {

                    response.write(JSON.stringify(track));
                    response.end();
                });
            }
        });
    });
}

exports.upload = upload;