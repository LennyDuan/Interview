// This file is used to run 'gulp test'

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var exec = require('child_process').exec;
var config = require('./config.default');

gulp.task('test', function () {
  gulp.src(['./test/**/*.test.js'], {read: false}).pipe(mocha({
    reporter: 'list',
    globals: {
      should: require('chai').should(),
      expect: require('chai').expect()
    }
  })).on('error', gutil.log);
});

gulp.task('test-watch', function () {
  gulp.watch('./**/*.js', ['test']);
});
