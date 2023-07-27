// * Задача для js ("Глобальные скрипты")
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const gulpif = require('gulp-if');

module.exports = function () {
	return gulp
		.src('./src/scripts/libs/*.js')
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
		.pipe(concat('global.min.js'))
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
		.pipe(gulp.dest('./build/assets/scripts'))
		.pipe(browserSync.stream());
};
