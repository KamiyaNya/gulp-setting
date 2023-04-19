const gulp = require('gulp');
const browserSync = require('browser-sync');

module.exports = function () {
	return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./build/assets/fonts')).pipe(browserSync.stream());
};
