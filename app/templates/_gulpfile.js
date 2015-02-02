var gulp            = require('gulp');
var autoprefixer    = require('gulp-autoprefixer');
var sass            = require('gulp-sass');
var uglify          = require('gulp-uglify');
var notify          = require('gulp-notify');
var rename          = require ('gulp-rename');
var concat          = require ('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var livereload      = require('gulp-livereload');

gulp.task('default', ['sass', 'js'], function() {
    livereload.listen();
    gulp.watch(
        "src/sass/**/*.scss", ['sass']
    );
    gulp.watch(
        "src/js/**/*.js", ['js']
    );
});

gulp.task('csscomponents', function() {
    // Copies CSS components src/vendor
    // Changes .css to a .scss extension
    // For SASS
    gulp.src([
            'bower_components/normalize.css/normalize.css',
        ])
        .pipe(rename(function(path) {
            path.extname = ".scss"
        }))
        .pipe(gulp.dest('src/sass/vendor'));
});

gulp.task('sass', ['csscomponents'], function() {
    gulp.src(['src/sass/main.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 25 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify({
            message: "Task 'sass' ran successfully"
        }))
        .pipe(livereload());
});

gulp.task('js', function() {
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'src/js/partials/_helloworld.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: "Task 'js' ran successfully"
        }))
        .pipe(livereload());
});

