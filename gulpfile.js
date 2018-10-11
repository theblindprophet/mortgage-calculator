const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');

const sassConfig = {
	inputDirectory: ['./sass/*.scss', '!./sass/variables.scss'],
	outputDirectory: './css',
	options: {
		outputStyle: 'expanded'
	}
};

gulp.task('build-css', function() {
	return gulp
		.src(sassConfig.inputDirectory)
    .pipe(sass(sassConfig.options).on('error', sass.logError))
    .pipe(clean())
		.pipe(gulp.dest(sassConfig.outputDirectory));
});

gulp.task('watch', function() {
	gulp.watch(sassConfig.inputDirectory, ['build-css']);
});