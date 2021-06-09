const gulp = require('gulp');
const sass = require('gulp-sass');
var concat = require("gulp-concat");
const del = require('del');
const gulpOrder = require('gulp-order');

let BuildType = 'debug'

gulp.task('styles', () => {
    var orderedFiles = [
        'src/styles/scss/partials/_variables.scss',
        'src/styles/scss/partials/_mixins.scss',
        'src/styles/scss/vendor/sanitize.scss',
        'src/styles/scss/vendor/**.scss','!./src/styles/scss/vendor/sanitize.scss',
        'src/styles/scss/layout/**/*.scss',
        'src/styles/scss/base/**/*.scss',
        'src/styles/scss/modules/**/*.scss'
    ];

    return gulp.src('./src/styles/scss/**/*.scss')
        .pipe(gulpOrder(orderedFiles, { base: __dirname }))
        .pipe(concat("main.scss"))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`./${BuildType}/css`));
});

gulp.task('clean', () => {
    return del([
        `${BuildType}/css/main.css`,
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));