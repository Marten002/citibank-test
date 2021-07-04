const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemap = require('gulp-sourcemaps')
const watch = require('gulp-watch')

gulp.task('sass-compile', () => {
    return gulp.src('./scss/**/*.scss')
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemap.write('./'))
    .pipe(gulp.dest('./css'))
})

gulp.task('watch', () => {
    return gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'))
})

