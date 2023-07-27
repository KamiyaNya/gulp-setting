const gulp = require('gulp');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const recompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');

// * Задача для оптимизации растровых изображений
module.exports = function () {
	return gulp
		.src('./src/images/**/*.+(png|jpg|jpeg|gif|svg|ico)')
		.pipe(plumber())
		.pipe(changed('./build/images'))
		.pipe(
			imagemin(
				{
					interlaced: true,
					progressive: true,
					optimizationLevel: 5,
				},
				[
					recompress({
						loops: 6,
						min: 80,
						max: 90,
						quality: 'high',
						use: [
							pngquant({
								quality: [0.85, 1],
								strip: true,
								speed: 1,
							}),
						],
					}),
					imagemin.gifsicle(),
					imagemin.optipng(),
					imagemin.svgo(),
				]
			)
		)
		.pipe(gulp.dest('./build/assets/images'))
		.pipe(browserSync.stream());
};
