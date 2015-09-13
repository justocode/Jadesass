module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['copy', 'jade', 'sass', 'autoprefixer', 'includes:javascript', 'connect', 'watch']);

  grunt.initConfig({
    clean: {
      options: {
        force: true
      },
      dist: ['dist'],
      libraries: ['dist/assets/libraries'],
      images: ['dist/assets/images']
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
    sass: {
      compile: {
        options: {
          sourceMap: false,
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
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 3 versions', '> 1%', 'ie 8', 'ie 7']
        },
        files: [{
          expand: true,
          cwd: 'dist/assets/styles',
          src: ['*.css'],
          dest: 'dist/assets/styles',
          ext: '.css'
        }]
      }
    },
    includes: {
      javascript: {
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
    },
    watch: {
      jade: {
        files: ['source/**/*.jade'],
        tasks: ['jade'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      sass: {
        files: ['source/styles/**/*.sass'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      javascript: {
        files: ['source/scripts/**/*.js'],
        tasks: ['includes:javascript'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      libraries: {
        files: ['source/libraries/**/*'],
        tasks: ['clean:libraries', 'copy:libraries'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ['source/images/**/*'],
        tasks: ['clean:images', 'copy:images'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dist',
          livereload: true
        }
      }
    }
  });
};
