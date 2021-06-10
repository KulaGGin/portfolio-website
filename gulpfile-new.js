const gulp = require('gulp');
const sass = require('gulp-sass');
var concat = require("gulp-concat");
const del = require('del');
const gulpOrder = require('gulp-order');
const inject = require('gulp-inject');
const series = require('stream-series');

class Config {
    constructor() {
        this.sourcePaths = new (function () {
            this.html = {path: ['src/*.html']};
            this.fonts = {path: ['src/fonts/**/*.*']};
            this.img = {path: ['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.gif', 'src/img/**/*.*']};
            this.css = {path: ['src/styles/**/*.css', 'src/styles/**/*.css.map']};
            this.scss = {path: ['src/styles/**/*.scss']};
            this.less = {path: ['src/styles/**/*.less']};
            this.js = {path: ['src/js/**/*.js', 'src/css/**/*.js.map']};
            this.path = 'src/';
        })();

        this.debugPath = 'debug/';
        this.releasePath = 'docs/'

        this.build = new (function() {
            this.path = "";
            this.type = "debug";
            this.html = {};
            this.img = {};
            this.css = {};
            this.js = {}
        })();

        this.build.path = this[`${this.build.type}Path`];

        this.buildPath = this.build.path;

        this.build.html.path = this.buildPath;
        this.build.img.path = this.buildPath + 'img';
        this.build.css.path = this.buildPath + 'css';
        this.build.js.path = this.buildPath + 'js';
    }
}

let config = new Config();

// Move html to build folder and inject appropriate files
gulp.task(`compile:html`, function(done) {
    var filesToInject = series(gulp.src([config.buildPath + 'css/**/*.css']), gulp.src([config.build.path + 'js/**/*.js']));

    var injectOptions = new (function() {
        this.addRootSlash = false;
        this.ignorePath = [config.sourcePaths.path, config.build.path];
    })();

    gulp.src(config.sourcePaths.html.path)
        .pipe(inject(filesToInject, injectOptions))
        .pipe(gulp.dest(config.build.path));

    done();
});

// Move fonts to build folder
gulp.task('compile:fonts', function(done) {
    gulp.src(config.sourcePaths.fonts.path)
        .pipe(gulp.dest(config.build.path + 'fonts'));

    done();
});

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
        .pipe(gulp.dest(`./${config.build.type}/css`));
});

gulp.task('clean', () => {
    return del([
        `${BuildType}/css/main.css`,
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));