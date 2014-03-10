var fs = require("fs"),
    exec = require("child_process").exec;

function TrackStorage() {

}

TrackStorage.prototype.getTrackById = function (id) {

    // TODO: get from db...
    return this.getTrackFromFile(id);

};

TrackStorage.prototype.getTrackFromFile = function (id) {
    // i.e from uploaded/uploaded2014-03-10T22-13-d9f95ba0-a898-11e3-97d1-b1df3ef31179
    // where id is the part after the date, above starting after 22-13-

    // what is working directory?
//    exec('pwd',
//        function (error, stdout, stderr) {
//            console.log('stdout: ' + stdout);
//            console.log('stderr: ' + stderr);
//            if (error !== null) {
//                console.log('exec error: ' + error);
//            }
//        });
//   working dir: /Users/karlfock/GoogleDrive/dev/js/tcxParser

    var path = "./uploaded/" + id;

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log("getTrackFromFile: file not found", path);
        }
        if(data) {
            console.log("got file by id: ", data.substring(0, 300), "...");
        }
    });
};

exports.TrackStorage = TrackStorage;
