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
		.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)', { ignore: './src/img/svg/**/*' })
		.pipe(plumber())
		.pipe(changed('./build/img'))
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
						min: 50,
						max: 90,
						quality: 'high',
						use: [
							pngquant({
								quality: [0.8, 1],
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
		.pipe(gulp.dest('./build/assets/img'))
		.pipe(browserSync.stream());
};
