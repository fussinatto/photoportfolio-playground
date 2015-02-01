module.exports = function(grunt) {

  // configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'styles',
          config: 'config.rb'
        }
      }
    },

    watch: {
      sass: {
        files: ['sass/*.scss'],
        tasks: ['compass:dist']
      },
      css: {
        files: ['*.css']
      },
      js: {
        files: ['*.js']
      },
      livereload: {
        files: ['styles/*.css', '{,*/}*.html', '/images/{,*/}*', '{,*/}*.js'],
        options: {
          livereload: true
        },
      }
    },

    csscomb: {
      options: {
        // Task-specific options go here. 
      },
      your_target: {
        // Target-specific file lists and/or options go here. 
      },
    },

    connect: {
      server: {
        options: {
          port: 9001,
          livereload: true
        }
      }
    }

  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-csscomb');

  // register tasks
  grunt.registerTask('default', [
    'connect',
    'watch'
  ]);

   grunt.registerTask('csscomb', [
    'csscomb'
  ]);
};
