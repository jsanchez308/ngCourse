var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    reload = browserSync.reload,
    bower = require('gulp-bower'),
    filesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    merge = require('merge-stream'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    annotate = require('gulp-ng-annotate'),
    wiredep = require('wiredep').stream;

var globs = {
    styles: 'app/styles/**/*.scss',
    html: 'app/**/*.html',
    js: 'app/src/**/*.js',
    assets: [
        'app/fonts/**/*',
        'app/images/**/*',
        'app/views/**/*'
    ]
};

var fontExts = ['eot', 'svg', 'ttf', 'woff', 'woff2', 'otf'];

var compileSass = function () {
    return gulp.src(globs.styles)
        .pipe(sass())
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({ stream: true }));
};

gulp.task('sass', ['wiredep-sass'], compileSass);

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

gulp.task('bower-fonts', ['app-bower'], function () {
    return gulp.src(fontExts.map(function (ext) {
        return 'app/bower_components/**/*.' + ext;
    })).pipe(rename({
        dirname: ''
    })).pipe(gulp.dest('app/fonts/lib'));
});

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

gulp.task('inject', ['wiredep', 'sass'], injectFiles);

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
            injectFiles();
        } else {
            reload();
        }
    });

    gulp.watch(globs.styles)
        .on('change', compileSass);
    gulp.watch(globs.html)
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

gulp.task('mv', function () {
    return gulp.src(globs.assets, { base: 'app' })
        .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', function () {
    return gulp.src('app/index.html')
        .pipe(usemin({
            css: [minifycss(), 'concat'],
            app: [annotate(), uglify()],
            vendor: [uglify()]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['usemin', 'mv']);

gulp.task('deploy', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        port: 5010,
        ui: {
            port: 5011
        }
    });
})

gulp.task('default', ['serve']);
