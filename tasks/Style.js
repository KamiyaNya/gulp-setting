const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const prefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const gulpif = require('gulp-if');
const sourcemaps = require("gulp-sourcemaps");


// * Задача для стилей
module.exports = function () {
	return gulp
		.src('./src/styles/*.scss')
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
		.pipe(
			sass({
				outputStyle: 'compressed',
			}).on('error', sass.logError)
		)
		.pipe(
			prefixer({
				overrideBrowserslist: ['last 8 versions'],
				browsers: ['Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 11', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'],
			})
		)
		.pipe(
			gulpif(
				process.env.NODE_ENV === 'production',
				cleanCSS({
					level: 2,
				})
			)
		)
		.pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
		.pipe(gulp.dest('./build/assets/styles'))
		.pipe(browserSync.stream());
};
