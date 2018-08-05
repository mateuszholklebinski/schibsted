var gulp = require('gulp'),
	babelify = require('babelify'),
    browserify = require("browserify"),
    connect = require("gulp-connect"),
    source = require("vinyl-source-stream"),
	babel = require('gulp-babel'),
	jasmine = require('gulp-jasmine'),
	concat = require('gulp-concat');

var testDependencies = [
	'./databinder/DataBinder.js',
    './spec/test.js'
];

var appDependencies = [
	'./databinder/DataBinder.js',
    './app/app.js'
];

gulp.task('build-data-binder', function() {
	return browserify({
        entries: './databinder/DataBinder.js'
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("databinder.js"))
    .pipe(gulp.dest("./databinder/output"))
    ;
});

gulp.task('build-app', function() {
	return browserify({
        entries: appDependencies
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("./app/output"))
    ;
});

gulp.task('test-js', function()  {
	return browserify({
        entries: testDependencies
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("test.js"))
    .pipe(gulp.dest("./spec/output"))
    ;
})

gulp.task('start-jasmine', function() {
	return gulp.src("./spec/output/test.js")
		.pipe(jasmine());
});

gulp.task('default', ["js"] ,function() {
	gulp.watch('./databinder/DataBinder.js', ['build-data-binder']);
});