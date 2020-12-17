// Require packages from node_modules

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

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
  );
}

exports.style = style;

function watch(){
    // Watches for all SCSS changes (but only outputs on main.scss)
    gulp.watch('stylesheets/scss/**/*.scss', style)
}

exports.watch = watch;
