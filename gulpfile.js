var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    reload = browserSync.reload,
    bower = require('gulp-bower'),
    filesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    merge = require('merge-stream'),
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

gulp.task('sass', function () {
    return gulp.src(globs.styles)
        .pipe(sass())
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({ stream: true }));
});

gulp.task('bower', function () {
    return bower({ cmd: 'install' })
        .pipe(gulp.dest('app/bower_components'));
});

gulp.task('wiredep', ['bower'], function () {
    return gulp.src('app/index.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('inject', ['wiredep'], function () {
    var js = gulp.src(globs.js)
        .pipe(filesort());
    var scss = gulp.src(globs.styles);
    return gulp.src('app/index.html')
        .pipe(inject(merge(js, scss), {
            relative: true
        }))
        .pipe(gulp.dest('app/'));
});

gulp.task('serve', ['sass', 'inject'], function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 5000,
        ui: {
            port: 5001
        }
    });

    gulp.watch('/bower_components', ['bower']);

    gulp.watch(globs.styles, ['sass']);
    gulp.watch([globs.html, globs.js])
        .on('change', reload);
});

gulp.task('default', ['serve']);
