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
            node: {
                files: [
                    "node/**/*.js"
                ],
                tasks: ["nodemon"],
            },

            web: {
                files: [
                    "app/**/*.js",
                ],
                tasks: ["browserify"]//,
                // options: {
                //     livereload: true,
                // }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            watchNodeAndWeb: {
                tasks: ["watch:node", "watch:web"]
            }
        },

        browserify: {
            js: {
                src: "app/js/main.js",
                dest: "bundle.js",
            },
        },

        nodemon: {
            dev: {
                script: "node/index.js"
            }
        }
    });


    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");
    
    // currently have to edit some node file to start nodemon...
    grunt.registerTask("start", ["concurrent:watchNodeAndWeb"]);
};