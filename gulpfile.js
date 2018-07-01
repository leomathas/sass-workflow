const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify_css = require('gulp-clean-css');
const concat = require('gulp-concat');

// Compile, Concat & Minify Sass
gulp.task('sass', function(){
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(prefix('last 3 versions'))
        .pipe(concat('style.min.css'))
        .pipe(minify_css())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});


// Watch & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './src'
    });
    
    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
