var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    cssnano = require('gulp-cssnano'),
    concat = require("gulp-concat");

/*gulp.task('nano', function() {
    return gulp.src('app/css/style.css')s
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
});*/

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
    .pipe(sass())
    .pipe(concat('one.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('useref', function() {
    return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('app/**/*.js', uglify()))
    .pipe(gulpIf('app/**/*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['browserSync','sass', 'useref'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/index.html', browserSync.reload);
    gulp.watch('app/js/index.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});
