var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
// var eslint = require('gulp-eslint');
var sass = require("gulp-sass");
// var image = require("gulp-image");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
// var imageresize = require("gulp-image-resize");
 

// This is a very basic Gulp task,
// with a name and some code to run
// when this task is called:
gulp.task('scripts', function(done) {
   return gulp
       .src(['./js/index.js', '!node_modules/**'])
      //  .pipe(eslint())
      //  .pipe(eslint.format())
      //  .pipe(eslint.failAfterError())
       .pipe(uglify()) // Call the uglify function on these files
       .pipe(rename({ extname: '.min.js' })) // Rename the uglified file
       .pipe(gulp.dest('./build/js')) // Where do we put the result?
       .pipe(browserSync.stream());
});

gulp.task('js-watch', gulp.series('scripts'), function(done) {
   browserSync.reload();
   done();
});

gulp.task('sass', function() {
 return gulp
   .src('./sass/*.scss')
   .pipe(sass())
   .pipe(
     autoprefixer({
       browsers: ['last 2 versions']
     })
   )
   .pipe(cssnano())
   .pipe(rename('style.min.css'))
   .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

// gulp.task('image', function (done) {
//   return gulp
//   .src('./images/*')
//   .pipe(imageresize({
//       width : 640,
//       height : 640,
//       crop : true,
//       upscale : false
//     }))
//     .pipe(image())
//     .pipe(gulp.dest('./build/img'));
// });

gulp.task('serve', function() {
   browserSync.init({
       server: {
           baseDir: './'
       }
   });

   gulp.watch('./js/index.js', gulp.series('js-watch'));
   gulp.watch('./sass/*.scss', gulp.series('sass'));
  //  gulp.watch('./scss/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('serve'));
