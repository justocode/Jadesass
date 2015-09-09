var gulp        = require('gulp');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');

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

gulp.task('default', function() {
  gulp.watch(['./src/**/*.jade'], ['jade']);
  gulp.watch(['./src/styles/**/*.sass'], ['sass']);
});
