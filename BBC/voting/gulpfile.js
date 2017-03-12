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

gulp.task('bigdata', function () {
  gulp.src(['./test/bigdata/bigData.test.js'], {read: false}).pipe(mocha({
    reporter: 'list',
    globals: {
      should: require('chai').should(),
      expect: require('chai').expect()
    }
  })).on('error', gutil.log);
});

gulp.task('create', function () {
  gulp.src(['./test/**/createVote.js'], {read: false}).pipe(mocha({
    reporter: 'list',
    globals: {
      should: require('chai').should(),
      expect: require('chai').expect()
    }
  })).on('error', gutil.log);
});
