var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss', 'node_modules/chart.js/dist/Chart.css', 'node_modules/font-awesome/css/font-awesome.css'])
.pipe(sass())
.pipe(gulp.dest("src/css"))
.pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/chart.js/dist/Chart.js'])
.pipe(gulp.dest("src/js"))
.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/font-awesome/fonts/*')
      .pipe(gulp.dest('public/fonts'))
  })
  

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

browserSync.init({
server: "./src"
});

gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task("default", gulp.series("js", "serve"));