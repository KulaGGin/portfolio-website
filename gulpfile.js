// Declaring Gulp constants
const
    gulp = require('gulp'),
    runSeq = require('run-sequence'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject'),
    series = require('stream-series'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    gulpIf = require('gulp-if'),
    notify = require('gulp-notify');

const del = require('del');
const gulpOrder = require('gulp-order');

const
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('postcss-cssnext'),
    uncss = require('postcss-uncss'),
    cssnano = require('cssnano');

const
    browserSync = require('browser-sync').create();

// Config used to configure gulp tasks, note - it is written as self-invoking anonymous (function() {})();
const config = new (function() {
    this.src = new (function() {
        this.html = {path: ['src/*.html']};
        this.fonts = {path: ['src/fonts/**/*.*']};
        this.img = {path: ['src/img/**/*.jpg', 'src/img/**/*.png', 'src/img/**/*.gif', 'src/img/**/*.*']};
        this.css = {path: ['src/styles/**/*.css', 'src/styles/**/*.css.map']};
        this.scss = {path: ['src/styles/**/*.scss']};
        this.less = {path: ['src/styles/**/*.less']};
        this.js = {path: ['src/js/**/*.js', 'src/css/**/*.js.map']};
        this.path = 'src/';
    })();
    
    this.debug = new (function() {
        this.path = 'debug/';
    })();
    
    this.release = new (function() {
        this.path = 'docs/'
    })();
    
    this.build = new (function() {
        this.type = "debug";
        this.html = {};
        this.img = {};
        this.css = {};
        this.js = {}
    })();
    this.build.path = this[this.build.type].path;
    
    this.buildPath = this.build.path;
    this.build.html.path = this.buildPath;
    this.build.img.path = this.buildPath + 'img';
    this.build.css.path = this.buildPath + 'css';
    this.build.js.path = this.buildPath + 'js';
})();

// Default task
gulp.task('default', function() {
    runSeq('compile:all', 'browserSync:serve', 'watch:all')
});

// Watch src folder, when files are changed in src folder - call appropriate task:
// Compile and move needed files to build folder
gulp.task('watch:all', function() {
    gulp.watch(config.src.html.path, {cwd: './'}, ['compile:html']).on('error', handleError);
    gulp.watch(config.src.fonts.path, {cwd: './'}, ['compile:fonts']).on('error', handleError); // Using cwd hack to update browser when files are
    gulp.watch(config.src.img.path, {cwd: './'}, ['compile:img']).on('error', handleError); //     deleted and added
    gulp.watch(config.src.scss.path, {cwd: './'}, ['compile:sass']).on('error', handleError);
    gulp.watch(config.src.css.path, {cwd: './'}, ['compile:css']).on('error', handleError);
    gulp.watch(config.src.js.path, {cwd: './'}, ['compile:js']).on('error', handleError);
    
    // Reload browser only when files in dist folder are changed
    // gulp.watch('./docs/**/*').on('change', browserSync.reload);
});

gulp.task('compile:all', function() {
    runSeq('compile:sass', 'compile:img', 'compile:js', 'compile:fonts', 'compile:html');
});


// Move html to build folder and inject appropriate files
gulp.task('compile:html', function() {
    //var injectFiles = gulp.src([config.build.path + 'css/**/*.css'], [config.build.path + 'js/*.js']);
    var injectFiles = series(gulp.src([config.build.path + 'css/**/*.css']), gulp.src([config.build.path + 'js/**/*.js']));
    
    var injectOptions = new (function() {
        this.addRootSlash = false;
        this.ignorePath = [config.src.path, config.build.path];
    })();
    
    gulp.src(config.src.html.path)
        .pipe(inject(injectFiles, injectOptions))
        .pipe(gulp.dest(config.build.path));
    
    browserSync.reload();
});

// Move html to build folder and inject appropriate files
gulp.task('compile:fonts', function() {
    
    gulp.src(config.src.fonts.path)
        .pipe(gulp.dest(config.build.path + 'fonts'));
    
    browserSync.reload();
});


// Process images with imagemin plugin and move to build folder
gulp.task('compile:img', function() {
    gulp.src(config.src.img.path)
        .pipe(imagemin([
            //imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest(config.build.path + 'img'));
    
    browserSync.reload();
});

gulp.task('compile:sass', () => {
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
        .pipe(gulp.dest(config.build.path + 'css'));
});

// // // Compile sass and move to build folder
// gulp.task('compile:sass', function() {
//     // Dynamically add plugins depending on if debugging or releasing
//     var plugins = getPostCSSPlugins();
//
//     var scssList = new ScssInjectList();
//
//     gulp.src(config.src.path + 'styles/scss/main.scss')
//         .pipe(plumber({errorHandler: handleError})) // plumber to catch errors
//         .pipe(inject(scssList.fileStream, scssList.injectOptions)) // Inject other .scss into main.scss
//         .pipe(gulpIf(config.build.type === "debug", sourcemaps.init())) // init sourcemaps if developing
//         .pipe(sass()) // compile into .css
//         .pipe(concat('bundle.min.css')) // concat into a single file
//         .pipe(postcss(plugins)) // pass through postcss plugins
//         .pipe(gulpIf(config.build.type === "debug", sourcemaps.write())) // write sourcemaps if developing
//         .pipe(gulp.dest(config.build.path + 'css')) // save
//         // .pipe(browserSync.stream()); // Stream it to update page in real time without reloading page
// }


function ScssInjectList() {
    
    var ScssInjectList = {};
    // ScssInjectList.fileStream = [];

    // log('Hello world!');
    
    // injectFiles
    ScssInjectList.fileStream = series(
        gulp.src(['./src/styles/scss/partials/**/*.scss']),
        
        gulp.src(['./src/styles/scss/vendor/sanitize.scss']),
        gulp.src(['./src/styles/scss/vendor/**.scss','!./src/styles/scss/vendor/sanitize.scss']),
        
        gulp.src(['./src/styles/scss/layout/**/*.scss']),
        
        gulp.src(['./src/styles/scss/base/**/*.scss']),
        
        gulp.src(['./src/styles/scss/modules/**/*.scss'])
    );
    
    ScssInjectList.injectOptions = {
        transform: transformFilepath,
        starttag: '// inject:app',
        endtag: '// endinject',
        addRootSlash: false
    };
    
    
    return ScssInjectList;
}

// // Compile less and move to build folder
gulp.task('compile:less', function() {
    // Dynamically add plugins depending on if debugging or releasing
    var plugins = getPostCSSPlugins();
    
    var injectFiles = gulp.src(
        [   './src/styles/less/partials/**/*.less',
            './src/styles/less/layout/**/*.less',
            '!./src/styles/less/main.less'
        ],
        
        {read: false}
    );
    
    var injectOptions = {
        transform: transformFilepath,
        starttag: '// inject:app',
        endtag: '// endinject',
        addRootSlash: false
    };
    
    gulp.src(config.src.path + 'styles/less/main.less')
        .pipe(plumber({errorHandler: handleError})) // plumber to catch errors
        .pipe(inject(injectFiles, injectOptions)) // Inject other .less files into main.less
        .pipe(gulpIf(config.build.type === "debug", sourcemaps.init())) // init sourcemaps if developing
        .pipe(less()) // compile into .css
        .pipe(postcss(plugins)) // pass through postcss plugins
        .pipe(gulpIf(config.build.type === "debug", sourcemaps.write())) // write sourcemaps if developing
        .pipe(gulp.dest(config.build.path + 'css')) // save
        .pipe(browserSync.stream()); // Stream it to update page in real time without reloading page
});

gulp.task('compile:js', function() {
    gulp.src(['./src/js/**/*.js', '!./src/js/main.js'])
        .pipe(plumber({errorHandler: handleError}))
        .pipe(gulpIf(config.build.type === "debug", sourcemaps.init())) // init sourcemaps if developing
        .pipe(gulpIf(config.build.type === "debug", sourcemaps.write())) // write sourcemaps if developing
        .pipe(concat('main.js')) // Inject other .js into main.js
        .pipe(gulp.dest(config.build.path + 'js'));
    
    browserSync.reload();
});

gulp.task('browserSync:serve', function() {
    
    var paramsObj = new (function() {
        
        this.server = (function() {
            //return this.baseDir = config.build.type;
            let buildType = config.build.type;
            return this.baseDir = config[buildType].path;
        })();
        
        this.port = 8080;
        this.open = false;
        this.notify = false;
    })();
    
    browserSync.init(paramsObj);
});

// // Opacity hack function used by Autoprefixer
function opacityHack(css, opts) {
    css.walkDecls(function(decl) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter(decl, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat(decl.value) * 100) + ')"'
            });
        }
    });
}

// Error handler used by Gulp to catch and display errors without destroying tasks
function handleError(error) {
    notify.onError({
        title: "Gulp error in " + error.plugin,
        message: error.toString()
    })(error);
    
    this.emit('end');
}

function getPostCSSPlugins() {
    // Dynamically add plugins depending on if debugging or releasing
    var plugins = [
        opacityHack,
        cssnext({browsers: ['last 3 versions']})
    ];
    
    // add plugins if publishing
    if (config.build.type === "debug") {
        plugins.splice(plugins.length - 1, 0, uncss({html: [config.src.path + 'index.html']}));
        plugins.splice(plugins.length - 1, 0, cssnano({autoprefixer: false}));
    }
    
    return plugins;
}


// Used to inject files
function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
}