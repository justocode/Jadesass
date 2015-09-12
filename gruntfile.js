module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'jade', 'sass', 'includes:js']);

  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      dist: ['dist']
    },
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'expanded'
      },
      compile: {
        files: {
          'dist/styles/main.css': 'src/styles/main.sass'
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.jade'],
          dest: 'dist',
          ext: '.html'
        }]
      }
    },
    includes: {
      js: {
        options: {
          includeRegexp: /^(\s*)@include\s+"(\S+)";\s*$/,
          silent: true
        },
        files: [{
          cwd: 'src/scripts',
          src: 'main.js',
          dest: 'dist/scripts',
        }]
      }
    }
  });
};
