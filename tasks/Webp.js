const gulp = require('gulp');
const webp = require('gulp-webp');

module.exports = function () {
	return gulp
		.src('./src/images/**/*.+(png|jpg|jpeg|svg|ico)', { ignore: './src/images/svg/**/*' })
		.pipe(webp({ quality: 90 }))
		.pipe(gulp.dest('./build/assets/images/webp'));
};
