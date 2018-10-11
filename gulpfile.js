'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const liveReload = require('gulp-livereload');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

gulp.task('sass', function () {
	return gulp.src('./assets/src/sass/style.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('./assets/dist/css/'));
});

gulp.task('watch-dev', ['sass', 'js', 'copy-files'], function () {
	liveReload.listen();
	gulp.watch('./assets/src/**/*.*', ['sass', 'js', 'copy-files']);
});

gulp.task('copy-js-files', function () {
	return gulp.src([
		'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
		'./node_modules/jquery-validation/dist/jquery.validate.min.js',
		'./node_modules/jquery-validation/dist/additional-methods.min.js',
		'./node_modules/jquery/dist/jquery.min.js'
	])
		.pipe(gulp.dest('./assets/dist/js/'));
});

gulp.task('copy-css-files', function () {
	return gulp.src([
		'./node_modules/animate.css/animate.css'
	])
		.pipe(gulp.dest('./assets/dist/css/'));
});

gulp.task('js', function () {
	return gulp.src('./assets/src/js/scripts.js')
		.pipe(uglify())
		.pipe(rename({ basename: 'scripts.min' }))
		.pipe(gulp.dest('./assets/dist/js/'));
});

gulp.task('default', function (done) {
	gulp.start('sass', 'js', 'copy-js-files', 'copy-css-files')
		.on('end', done);
});
