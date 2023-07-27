const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const chalk = require("chalk");
const browserSync = require("browser-sync");
const uglify = require("gulp-uglify-es").default;

const jsPlugins = ["node_modules/swiper/swiper-bundle.min.js"];

// * Задача для js плагинов
module.exports = function jsPluginsFunc(done) {
	if (jsPlugins.length > 0)
		return gulp
			.src(jsPlugins)
			.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(concat("libs.min.js"))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest("./build/assets/scripts"))
			.pipe(browserSync.stream());
	else {
		return done(console.log(chalk.redBright("No added JS plugins")));
	}
};

