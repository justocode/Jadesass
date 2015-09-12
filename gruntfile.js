module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'copy', 'jade', 'sass', 'includes:js']);

  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      dist: ['dist'],
      libraries: ['dist/assets/libraries'],
      images: ['dist/assets/images'],
    },
    sass: {
      compile: {
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'source/styles',
          src: ['*.sass'],
          dest: 'dist/assets/styles',
          ext: '.css'
        }]
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'source',
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
          expand: true,
          cwd: 'source/scripts',
          src: '*.js',
          dest: 'dist/assets/scripts',
          ext: '.js'
        }]
      }
    },
    copy: {
      libraries: {
        expand: true,
        cwd: 'source/libraries',
        src: ['**'],
        dest: 'dist/assets/libraries'
      },
      images: {
        expand: true,
        cwd: 'source/images',
        src: ['**'],
        dest: 'dist/assets/images'
      }
    }
  });
};
