var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    reload = browserSync.reload,
    bower = require('gulp-bower'),
    filesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    merge = require('merge-stream'),
    watch = require('gulp-watch'),
    wiredep = require('wiredep').stream;

var globs = {
    styles: 'app/styles/**/*.scss',
    html: 'app/**/*.html',
    js: 'app/src/**/*.js',
    assets: [
        './app/fonts/**/*',
        './app/images/**/*',
        './app/views/**/*'
    ]
};

var compileSass = function () {
    return gulp.src(globs.styles)
    .pipe(sass())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({ stream: true }));
};

gulp.task('sass-build', ['wiredep-sass'], compileSass);

gulp.task('sass', compileSass)

gulp.task('app-bower', function () {
    return bower({ cmd: 'install', cwd: './app' })
        .pipe(gulp.dest('app/bower_components'));
});

gulp.task('wiredep-index', ['app-bower'], function () {
    return gulp.src('app/index.html')
        .pipe(wiredep({
            cwd: 'app'
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('wiredep-sass', ['app-bower'], function () {
    return gulp.src(globs.styles)
        .pipe(wiredep({
            cwd: 'app'
        }))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('wiredep', ['wiredep-sass', 'wiredep-index']);

var injectFiles = function () {
    var js = gulp.src(globs.js)
        .pipe(filesort());
    var scss = gulp.src(globs.styles);
    return gulp.src('app/index.html')
        .pipe(inject(merge(js, scss), {
            relative: true
        }))
        .pipe(gulp.dest('app/'));
};

gulp.task('inject', ['wiredep', 'sass-build'], injectFiles);

gulp.task('inject-index', ['wiredep-index'], injectFiles);

gulp.task('serve', ['inject'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 5000,
        ui: {
            port: 5001
        }
    });

    gulp.watch('app/bower_components', ['app-bower']);

    watch(globs.js, function (vinyl) {
        if (vinyl.event !== 'change') {
            gulp.start('inject-index');
        }
    });

    gulp.watch(globs.styles, ['sass']);
    gulp.watch([globs.html, globs.js])
        .on('change', reload);
});

gulp.task('course', function () {
    browserSync({
        server: {
            baseDir: 'course',
            routes: {
                '/README.md': 'README.md'
            }
        },
        port: 5060,
        ui: {
            port: 5061
        }
    });

    gulp.watch('README.md')
        .on('change', reload);
});

gulp.task('default', ['serve']);
