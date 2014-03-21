"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            files: [
                "gruntfile.js",
                "app/**/*.js",
                "node/**/*.js",
                "test/**/*.js"
            ],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        watch: {
            files: ["app/**/*.js"],
            tasks: ["browserify"],
            options: {
                livereload: true,
            },
        },

        browserify: {
            js: {
                src: "app/js/main.js",
                dest: "bundle.js",
            },
        }
    });

    grunt.registerTask("server", "Start a custom web server", function() {
        grunt.log.writeln("Started web server on port 3000");
        require("./node/index.js");
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
};