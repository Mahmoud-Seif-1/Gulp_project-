const gulp = require('gulp');
var   cleanCss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
// const processhtml = require('gulp-processhtml');
const { src, dest, watch, parallel, series } = require("gulp");

function allHtmlTask(){
  return gulp.src('project/*.html')
  .pipe(htmlmin({removeComments:true,collapseWhitespace:true}))
  .pipe(gulp.dest('./dist/html'));
}

function JsTask (){
return gulp.src('project/js/**/*.js')
  .pipe(concat('all.min.js'))
  .pipe(terser())
  .pipe(gulp.dest('./dist/js'));
}


function CssTask (){
return gulp.src('project/css/**/*.css')
  .pipe(concat('all.min.css'))
  .pipe(cleanCss())
  .pipe(gulp.dest('./dist/css'));
}



function imgMinify() {
    return gulp.src(globs.img)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}
exports.img = imgMinify




 
//  function seif () {
//     return gulp.src('./dist/**/*.html')
//                .pipe(processhtml(opts()))
//                .pipe(gulp.dest('./dist/SEIF'));
// };
// exports.mahmoud = seif

var globs = {
  html:"project/*.html",
  css:"project/css/**/*.css",
  img:'project/pics/*',
  js:'project/js/**/*.js'
}


var browserSync = require('browser-sync');
const { opts } = require("commander");
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}

function reloadTask(done) {
  browserSync.reload()
  done()
}

function watchTask() {
    watch(globs.html,series(allHtmlTask, reloadTask))
    watch(globs.js,series(JsTask, reloadTask))
    watch(globs.css, series(CssTask,reloadTask));
    watch(globs.img, series(imgMinify,reloadTask));
}
exports.default = series( parallel(imgMinify, CssTask,JsTask, allHtmlTask), serve , watchTask)




















// var globs={
//   html:"project/*.html",
//   css:"project/css/**/*.css",
//   img:'project/pics/*',
//   js:'project/js/**/*.js'
// }

// function minifyHTML() {
//     return src(globs.html)
//         .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
//         .pipe(gulp.dest('dist'))
// }
// exports.html = minifyHTML



// function jsMinify() {
//   return src(globs.js, { sourcemaps: true })
//         .pipe(concat('all.min.js'))
//         .pipe(terser())
//         .pipe(dest('dist/assets/js',{sourcemaps:'.'}))
// }
// exports.js = jsMinify


// function cssMinify() {
//     return src(globs.css)
//         .pipe(concat('style.min.css'))
//         .pipe(cleanCss())
//         .pipe(dest('dist/assets/css'))
// }
// exports.css = cssMinify


// function imgMinify() {
//     return gulp.src(globs.img)
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images'));
// }
// exports.img = imgMinify

// var browserSync = require('browser-sync');
// const { opts } = require("commander");
// function serve (cb){
//   browserSync({
//     server: {
//       baseDir: 'dist/'
//     }
//   });
//   cb()
// }

// function reloadTask(done) {
//   browserSync.reload()
//   done()
// }


 
//  function seif () {
//     return gulp.src('./dist/**/*.html')
//                .pipe(processhtml(opts()))
//                .pipe(gulp.dest('./dist/SEIF'));
// };
// exports.mahmoud = seif


// function watchTask() {
//     watch(globs.html,series(minifyHTML, reloadTask))
//     watch(globs.js,series(jsMinify, reloadTask))
//     watch(globs.css, series(cssMinify,reloadTask));
//     watch(globs.img, series(imgMinify,reloadTask));
// }
// exports.default = series( parallel(imgMinify, jsMinify, cssMinify, minifyHTML), serve , watchTask)