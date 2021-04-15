'use strict';

// Include gulp
const gulp = require('gulp');

// Include Plugins
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', () => {
  return gulp.src('./src/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./src/'));
});

gulp.task('sass', function () {
  return gulp.src(['./src/*.scss', './src/app/*.scss', './src/app/**/*.scss','./src/app/**/**/*.scss'])
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./src/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./src/*.scss', gulp.series('sass'));
    gulp.watch('./src/app/*.scss', gulp.series('sass'));
    gulp.watch('./src/app/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/app/**/**/*.scss', gulp.series('sass'));
});
// Default Task
gulp.task('default', gulp.parallel('sass', 'watch'));
