const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const sprite = require('gulp-svg-sprite');

module.exports = function () {
	return gulp
		.src('./src/sprite/*.svg')
		.pipe(
			svgmin({
				plugins: [
					{
						removeComments: true,
					},
					{
						removeEmptyContainers: true,
					},
				],
			})
		)
		.pipe(
			sprite({
				mode: {
					stack: {
						sprite: '../sprite.svg',
					},
				},
			})
		)
		.pipe(gulp.dest('./build/assets/img'));
};
