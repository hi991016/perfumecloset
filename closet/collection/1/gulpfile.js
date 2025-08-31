var gulp = require('gulp');
var sass = require('gulp-sass');
var pleeease = require('gulp-pleeease');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var connect = require('gulp-connect-php');

// Sass

gulp.task('sass', function () {
    gulp.src('sass/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(pleeease({
            autoprefixer: {
                browsers: ['last 4 versions']
            },
            minifier: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Imagemin

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('connect-sync', function() {
  connect.server({
    port:3000,
    base:'./',
    bin: '/Applications/MAMP/bin/php/php5.3.5/bin/php',
    ini: '/Applications/MAMP/bin/php/php5.3.5/conf/php.ini'
  }, function (){
    browserSync({
      proxy: 'localhost:3000'
    });
  });
});


// Reload all browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Task for `gulp` command

gulp.task('default',['browser-sync'], function() {
    gulp.watch('sass/*.scss',['sass']);
    gulp.watch("*.html", ['bs-reload']);
});
