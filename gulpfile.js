/* eslint-disable no-undef */
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');

const cssPluginsFunc = require('./tasks/CssPlugins.js');
const jsPluginsFunc = require('./tasks/JsPlugins.js');
const ftp = require('./tasks/Ftp.js');
const html = require('./tasks/Pug.js');
const styles = require('./tasks/Style.js');
const rastr = require('./tasks/Rastr.js');
const fonts = require('./tasks/Fonts.js');
const svgSprite = require('./tasks/Sprite.js');
const jsScript = require('./tasks/ScriptMain.js');
const jsGlobal = require('./tasks/ScriptGlobal.js');

const clean = () => {
	return del(['./build']);
};

const build = gulp.series(clean, gulp.parallel(styles, jsScript, jsGlobal, html, rastr, cssPluginsFunc, jsPluginsFunc, svgSprite, fonts));

const watch = () => {
	gulp.watch('./src/styles/**/*.scss', styles);
	gulp.watch('./src/js/scripts/**/*.js', jsScript);
	gulp.watch('./src/js/lib/**/*.js', jsGlobal);
	gulp.watch('./tasks/CssPlugins.js', cssPluginsFunc);
	gulp.watch('./tasks/JsPlugins.js', jsPluginsFunc);
	gulp.watch('./src/pug/**/*.pug', html);
	gulp.watch('./src/img/**/*', rastr);
	gulp.watch('./src/img/svg/**/*', svgSprite);
	gulp.watch('./src/fonts/**/*', fonts);
	gulp.watch('./build/**/*').on('change', browserSync.reload);
};

const start = gulp.series(
	clean,
	build,
	gulp.parallel(watch, () => browserSync({ server: { baseDir: './build' } }))
);

exports.build = build;
exports.watch = watch;
exports.start = start;
exports.deploy = ftp;
