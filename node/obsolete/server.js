var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname,
            filePath;

        console.log("Request for " + pathname + " received.");

        if (handle[pathname]) {
            route(handle, pathname, response, request);
        } else {
            filePath = path.join(process.cwd(), pathname);

            fs.exists(filePath, function(exists) {
                if (!exists) {
                    console.log(filePath, "doesn't exist");
                    response.writeHead(404, {
                        "Content-Type": "text/html"
                    });
                    response.write("404 Not Found: " + pathname + "\n");
                    response.end();
                    return;
                }

                // if (fs.statSync(filePath).isDirectory()) filePath += '/index.html';

                fs.readFile(filePath, "binary", function(err, file) {
                    if (err) {
                        response.writeHead(500, {
                            "Content-Type": "text/plain"
                        });
                        response.write(err + "\n");
                        response.end();
                        return;
                    }

                    response.writeHead(200);
                    response.write(file, "binary");
                    response.end();
                });
            });
        }
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;