const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const chalk = require("chalk");
const browserSync = require("browser-sync");

const cssPlugins = ["node_modules/swiper/swiper-bundle.min.css"];

// * Задача для стилей плагинов
module.exports = function cssPluginsFunc(done) {
	if (cssPlugins.length > 0) {
		return gulp
			.src(cssPlugins)
			.pipe(sourcemaps.init())
			.pipe(
				sass({
					outputStyle: "compressed",
				}).on("error", sass.logError)
			)
			.pipe(concat("libs.min.css"))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest("./build/assets/styles"))
			.pipe(browserSync.stream());
	} else {
		return done(console.log(chalk.redBright("No added CSS/SCSS plugins")));
	}
};
