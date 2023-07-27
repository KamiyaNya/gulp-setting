// * Задача для js (default)
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const gulpif = require('gulp-if');

module.exports = function () {
	return gulp
		.src('./src/scripts/main/*.js')
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
		.pipe(concat('main.min.js'))
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
		.pipe(gulp.dest('./build/assets/scripts'))
		.pipe(browserSync.stream());
};
