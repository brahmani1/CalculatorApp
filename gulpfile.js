var gulp = require('gulp');
var uglify=require('uglify-js');
var minify = require('gulp-minify');
 
gulp.task('compress', function() {
  gulp.src('scripts/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.min.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('dist/scripts'))
});