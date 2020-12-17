// Require packages from node_modules

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require("browser-sync").create();

// SCSS Processing

function style() {
  return (
    gulp
      // SCSS Input Source
      .src('stylesheets/scss/main.scss')
      // Initialize Source Maps
      .pipe(sourcemaps.init())
      // Run SCSS Pre-Processing
      .pipe(sass())
      // Error Handling
      .on("error", sass.logError)
      // Autoprefixer + CSS Minimizer
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Rename CSS Output File
      .pipe(rename('styles.css'))
      // Write Source Maps
      .pipe(sourcemaps.write('.'))
      // CSS Output Destination
      .pipe(gulp.dest('stylesheets/css'))
      .pipe(browserSync.stream())
  );
}

exports.style = style;

function reload() {
  browserSync.reload();
}

function watch() {
    // Start browserSync
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
    // Watches for all SCSS changes (but only outputs on main.scss)
    gulp.watch('stylesheets/scss/**/*.scss', style);
    // Reloads browserSync to update changes
    gulp.watch('**/*.html', reload);
}

exports.default = watch;
