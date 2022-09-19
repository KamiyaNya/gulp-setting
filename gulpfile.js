/* eslint-disable no-undef */
const gulp = require("gulp");
const gulpif = require("gulp-if");
const del = require("del");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const pug = require("gulp-pug");
const imagemin = require("gulp-imagemin");
const prefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify-es").default;
const changed = require("gulp-changed");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");
const plumber = require("gulp-plumber");
const svgmin = require("gulp-svgmin");
const sprite = require("gulp-svg-sprite");

const cssPluginsFunc = require("./tasks/CssPlugins.js");
const jsPluginsFunc = require("./tasks/JsPlugins.js");
const ftp = require("./tasks/ftp.js");

const clean = () => {
	return del(["./build"]);
};

const vendors = () => {
	return gulp.src("./src/vendors/**/*").pipe(gulp.dest("./build/assets/vendors"));
};

// * Задача для js (default)
const jsScript = () => {
	return gulp
		.src("./src/js/scripts/*.js")
		.pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.init()))
		.pipe(uglify())
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(concat("main.min.js"))
		.pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.write()))
		.pipe(gulp.dest("./build/assets/js/main"))
		.pipe(browserSync.stream());
};

// * Задача для js ("Глобальные скрипты")
const jsGlobal = () => {
	return gulp
		.src("./src/js/lib/*.js")
		.pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.init()))
		.pipe(uglify())
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(concat("global.min.js"))
		.pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.write()))
		.pipe(gulp.dest("./build/assets/js/global"))
		.pipe(browserSync.stream());
};

// * Задача для стилей
const styles = () => {
	return gulp
		.src("./src/styles/*.scss")
		.pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.init()))
		.pipe(
			sass({
				outputStyle: "compressed",
			}).on("error", sass.logError)
		)
		.pipe(
			prefixer({
				overrideBrowserslist: ["last 8 versions"],
				browsers: [
					"Android >= 4",
					"Chrome >= 20",
					"Firefox >= 24",
					"Explorer >= 11",
					"iOS >= 6",
					"Opera >= 12",
					"Safari >= 6",
				],
			})
		)
		.pipe(
			gulpif(
				process.env.NODE_ENV === "production",
				cleanCSS({
					level: 2,
				})
			)
		)
		.pipe(gulpif(process.env.NODE_ENV === "development", sourcemaps.write()))
		.pipe(gulp.dest("./build/assets/css"))
		.pipe(browserSync.stream());
};

// * Задача для конвертации pug в html
const html = () => {
	return gulp
		.src("./src/pug/*.pug")
		.pipe(pug({ pretty: process.env.NODE_ENV === "development" }))
		.pipe(gulp.dest("./build"))
		.pipe(browserSync.stream());
};

// * Задача для оптимизации растровых изображений
const rastr = () => {
	return gulp
		.src("./src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)")
		.pipe(plumber())
		.pipe(changed("./build/img"))
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
						quality: "high",
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
		.pipe(gulp.dest("./build/assets/img"))
		.pipe(browserSync.stream());
};

const svgSprite = () => {
	return gulp
		.src("./src/img/svg/**/*.svg")
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
						sprite: "../sprite.svg",
					},
				},
			})
		)
		.pipe(gulp.dest("./build/assets/img"));
};

const build = gulp.series(
	clean,
	gulp.parallel(vendors, styles, jsScript, jsGlobal, html, rastr, cssPluginsFunc, jsPluginsFunc, svgSprite)
);

const watch = () => {
	gulp.watch("./src/vendors/**/*", vendors);
	gulp.watch("./src/styles/**/*.scss", styles);
	gulp.watch("./src/js/scripts/**/*.js", jsScript);
	gulp.watch("./src/js/lib/**/*.js", jsScript);
	gulp.watch("./tasks/CssPlugins.js", cssPluginsFunc);
	gulp.watch("./tasks/JsPlugins.js", jsPluginsFunc);
	gulp.watch("./src/pug/**/*.pug", html);
	gulp.watch("./src/img/**/*", rastr);
	gulp.watch("./src/img/**/*", svgSprite);
	gulp.watch("./build/**/*").on("change", browserSync.reload);
};

const start = gulp.series(
	clean,
	build,
	gulp.parallel(watch, () => browserSync({ server: { baseDir: "./build" } }))
);

exports.build = build;
exports.watch = watch;
exports.start = start;
exports.deploy = ftp;
