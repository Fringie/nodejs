var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var changed = require('gulp-changed');


// live reload to make this work
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('default', function(){
  livereload.listen();

  nodemon({
    script: 'index.js',
    ext: 'js,pug,css',
    tasks: [
      'minify-css'
    ],
    ignore: [
      '/build/min/**/*'
    ]
  }).on('restart', function(){
    gulp.src('index.js')
      .pipe(livereload())
      .pipe(notify('Reloading the page..'));
  });
});

gulp.task('minify-css', function(){
  var cssSrc = "./public/css/**/*";
  var cssDest = "./build/min/css/";
  gulp.src(cssSrc)
    .pipe(changed(cssSrc))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(cssDest));


});
