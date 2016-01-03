var gulp = require("gulp"),
    del = require("del"),
    browserify = require("gulp-browserify"),
    jshint = require("gulp-jshint"),
    rename = require("gulp-rename")
    uglify = require("gulp-uglify");

gulp.task("clean", function(cb) {
    return del(['dist'], cb);
});

gulp.task("build", ["clean"], function() {
  return gulp.src('./lib/index.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(uglify())
    .pipe(browserify({ standalone: 'sananmuunnos' }))
    .pipe(rename('sananmuunnos.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);