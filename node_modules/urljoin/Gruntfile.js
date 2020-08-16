/**
 * Copyright (C) 2014 yanni4night.com
 * Gruntfile.js
 *
 * changelog
 * 2014-08-16[14:38:30]:authorized
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */


module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            index: ['index.js']
        },
        watch: {
            index: {
                files: ['index.js', 'test/*.js'],
                tasks: ['test']
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        },
        coveralls: {
            all: {
                src: 'coverage/lcov.info'
            }
        }
    });

    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['default', 'nodeunit']);
};