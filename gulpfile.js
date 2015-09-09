var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('jade', function() {
  gulp.src('./src/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  gulp.src('./src/styles/main.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('default', ['jade', 'sass'], function() {

  browserSync.init({
    server: './dist'
  });

  gulp.watch(['./src/**/*.jade'], ['jade']);
  gulp.watch(['./src/**/*.sass'], ['sass']);
  gulp.watch(['./dist/**/*.*'])
    .on('change', browserSync.reload);
});
