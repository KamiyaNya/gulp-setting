const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');
const excludePaths = ['!./src/pug/pages/**/components'];

// * Задача для конвертации pug в html
module.exports = function () {
	return gulp
		.src(['./src/pug/pages/**/*.pug', ...excludePaths])
		.pipe(pug({ pretty: process.env.NODE_ENV !== 'development' }))
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
};
