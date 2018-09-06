'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const liveReload = require('gulp-livereload');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

gulp.task('sass', function() {
    return gulp.src('./assets/src/sass/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/dist/css/'));
});

gulp.task('watch-dev', ['sass', 'js', 'copy-files', 'nodemon'], function() {
	liveReload.listen();
	gulp.watch('./assets/src/*.*', ['sass', 'js', 'copy-files', 'nodemon']);
});

gulp.task('copy-files', function() {
	return gulp.src([
		'./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
		'./node_modules/jquery/dist/jquery.slim.min.js'
	])
	.pipe(gulp.dest('./assets/dist/js/'));
});

gulp.task('js', function() {
	return gulp.src('./assets/src/js/scripts.js')
	.pipe(uglify())
	.pipe(rename({ basename: 'scripts.min' }))
	.pipe(gulp.dest('./assets/dist/js/'));
});

gulp.task('nodemon', function() {
	return nodemon({ script: 'app.js' });
});

gulp.task('default', function(done) {
	gulp.start('sass')
	.on('end', done);
});
