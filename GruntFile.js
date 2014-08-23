module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';'
            },
            js: {
                src: ['node_modules/jquery/dist/jquery.js', 'js/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
            css: {
                src: ['css/**/*.css'],
                dest: 'dist/<%= pkg.name %>.css'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyymmdd") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.js': ['<%= concat.js.dest %>']
                }
            }
        },

        qunit: {
            files: ['test/**/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('build', ['qunit', 'concat', 'uglify']);
    grunt.registerTask('debug', ['qunit', 'concat']);
    grunt.registerTask('test', ['qunit']);

    // default task
    grunt.registerTask('default', ['build']);
};