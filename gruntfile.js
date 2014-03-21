"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            // define the files to lint
            files: [
                "gruntfile.js",
                "app/**/*.js",
                "node/**/*.js",
                "test/**/*.js"
            ],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                },
                jshintrc: ".jshintrc"
            }
        },

        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    // grunt.registerTask("test", ["jshint"]);

};