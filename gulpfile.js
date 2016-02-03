var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');
var concat  = require('gulp-concat');
var uglify = require('gulp-uglify');

var app = 'server.js';

gulp.task('default', function() {
  nodemon({
    script: 'server.js'
  })
  gulp.src('public/js/*.js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dest'));
});