module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        js:{
          src: ['first.js','second.js' ],
          dest: 'build/js/scripts.js',
        },
        css:{
          src: ['first.css','second.css' ],
          dest: 'build/css/styles.css',
        }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build:{
        files:[
          {
            src: 'build/js/scripts.js',
            dest: 'build/js/scripts.js'
          }
        ]
      }
    },

    eslint: {
      options: {
        format: require('eslint-tap')
    },
      target: [

        // Add list of files to lint here
        'build/**/*.js'

      ]
    },

    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'app/css',
            src: '*.css',
            dest: 'css/',
            ext: '.min.css'

          }
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    // shell: {
    //   prodServer: {
    //   }
    // },
    shell: {
      // options: {
      //     stderr: false
      // },
      target: {
          command: 'ls'
      },
      // another: 'ls ./src' // Shorthand
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');


  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });
  grunt.registerTask('default', ['concat', 'watch']);

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  //exxxxample
  grunt.registerTask('concat', [
    'concat:js'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here

  ]);


};
