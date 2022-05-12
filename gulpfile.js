const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require('gulp-clean-css');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');

const clean = () => {
  return del(['./build']);
}

const vendors = () => {
  return gulp
    .src('./src/vendors/**/*')
    .pipe(gulp.dest('./build/assets/vendors'));
}

const js = () => {
  return gulp
    .src('./src/js/*.js')
    .pipe(named())
    .pipe(webpack({
      mode: process.env.NODE_ENV,
      devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'none',
      module: { rules: [{ test: /\.js$/, exclude : /node_modules/, loader  : 'babel-loader' }] },
      resolve: {
        alias: {
          '@lib': path.resolve(__dirname, 'src/js/lib'),
          '@vendors': path.resolve(__dirname, 'src/vendors')
        }
      }
    }))
    .pipe(gulp.dest('./build/assets/js'));
}

const styles = () => {
  return gulp
    .src('./src/styles/*.scss')
    .pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
    .pipe(sass())
    .pipe(gulpif(process.env.NODE_ENV === 'production', cleanCSS()))
    .pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gulp.dest('./build/assets/css'));
}

const html = () => {
  return gulp
    .src('./src/pages/*.pug')
    .pipe(pug({ pretty: process.env.NODE_ENV === 'development' }))
    .pipe(gulp.dest('./build'));
}

const images = () => {
  return gulp
    .src("./src/images/**/*")
    .pipe(
      imagemin([
        imagemin.mozjpeg({
          quality: 90,
          progressive: true,
        }),
      ])
    )
    .pipe(gulp.dest("./build/assets/images"));
}

const build = gulp.series(clean, gulp.parallel(vendors, styles, js, html, images));

const watch = () => {
  gulp.watch('./src/vendors/**/*', vendors);
  gulp.watch('./src/styles/**/*.scss', styles);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./src/pages/**/*.pug', html);
  gulp.watch('./src/images/**/*', images);
}

const start = gulp.series(
  clean,
  build,
  gulp.parallel(
    watch,
    () => browserSync({ server: { baseDir: './build' } })
  )
);

exports.build = build;
exports.watch = watch;
exports.start = start;