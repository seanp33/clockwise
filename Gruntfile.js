module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000,
                    base: '_build'
                }
            }
        },
        clean: {
            build: ['./_build/'],
        },
        copy: {
            web: {
                files: [
                    {
                        expand: true,
                        cwd: './src/',
                        src: '*.html',
                        dest: './_build/'
                    },
                    {
                        expand: true,
                        cwd: './src/',
                        src: '*.css',
                        dest: './_build/'
                    }
                ]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: './src/',
                    src: ['./images/**'],
                    dest: './_build/'
                }]
            },
            sounds: {
                files: [{
                    expand: true,
                    cwd: './src/',
                    src: ['./sounds/**'],
                    dest: './_build/'
                }]
            },
        },
        browserify: {
            release: {
                files: {
                    '_build/main.js': ['src/main.ts'],
                },
                options: {
                    plugin: ['tsify']
                }
            },
            debug: {
                files: {
                    '_build/main.js': ['src/main.ts'],
                },
                options: {
                    plugin: ['tsify'],
                    browserifyOptions: {
                        debug: true,
                    },
                    watch: false,
                    keepAlive: false
                }
            }
        },
        mochaTest: {
            all: {
                src: ['./src/tests/**/*.test.ts'],
                options: {
                    reporter: 'spec',
                    require: ['ts-node/register'],
                    debug: true
                }
            }
        }
    })

    grunt.registerTask('default', [
        'clean:build',
        'debug-build'
    ]);

    grunt.registerTask('unit', [
        'mochaTest:all'
    ]);

    grunt.registerTask('debug-build', [
        'browserify:debug',
        'copy:web',
        'copy:images',
        'copy:sounds'
    ]);
}