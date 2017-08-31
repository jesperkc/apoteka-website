// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


var sassDist = './apoteka-website-compiled/stylesheets/';

var sassSrc = './apoteka-website-source/stylesheets/style.scss';
var sassWatch = './apoteka-website-source/stylesheets/*.+(scss)';
var nunjucksSrc = './apoteka-website-source/pages/**/*.+(html|nunjucks)';
var nunjucksTemplatesSrc = './apoteka-website-source/templates/**/*.+(html|nunjucks)';

var nunjucksEmailSrc = 'app/emails/**/*.+(html|nunjucks)';

gulp.task('sass', function() {
    gulp.src(sassSrc)
        .pipe(sass())
        .pipe(gulp.dest(sassDist));
});

gulp.task('nunjucks', function() {
  return gulp.src(nunjucksSrc)
  .pipe(nunjucksRender({
      path: ['./apoteka-website-source']
    }))
  .pipe(gulp.dest('./apoteka-website-compiled'))
});

gulp.task('serve', function () {
  browserSync.init({
    server: './',
    port: 80
  });
  gulp.watch(sassWatch, ['sass', reload]);
  gulp.watch(nunjucksSrc, ['nunjucks', reload]);
  gulp.watch(nunjucksTemplatesSrc, ['nunjucks', reload]);
});

gulp.task('default', ['sass', 'nunjucks'], function() {
    gulp.watch(sassWatch, ['sass']);
    gulp.watch(nunjucksSrc, ['nunjucks']);
    gulp.watch(nunjucksTemplatesSrc, ['nunjucks']);
})
