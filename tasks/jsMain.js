// * Задача для js (default)
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify-es').default;
const gulpif = require('gulp-if');
const babel = require('gulp-babel');

module.exports = function () {
	return gulp
		.src('./src/js/scripts/*.js')
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
		.pipe(uglify())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(concat('main.min.js'))
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
		.pipe(gulp.dest('./build/assets/js/main'))
		.pipe(browserSync.stream());
};
