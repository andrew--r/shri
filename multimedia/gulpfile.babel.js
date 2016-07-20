import gulp from 'gulp';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import plumberErrorHandler from 'gulp-plumber-error-handler';
import rename from 'gulp-rename';
import changed from 'gulp-changed';

import include from 'gulp-html-tag-include';

import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import easyImport from 'postcss-easy-import';
import objectFit from 'postcss-object-fit-images';
import csso from 'gulp-csso';

import webpack from 'webpack-stream';


const OUT = './build';
const bsync = browserSync.create();

function errorHandler(taskName) {
	return {
		errorHandler: plumberErrorHandler(`Error in ${taskName} task`),
	};
}

function flatten(path) {
	path.dirname = '';
	return path;
};

gulp.task('copy-images', () => {
	return gulp
		.src('source/images/**/*')
		.pipe(plumber(errorHandler('copy-images')))
		.pipe(changed(OUT))
		.pipe(rename(flatten))
		.pipe(gulp.dest(OUT));
});

gulp.task('compile-css', ['copy-images'], () => {
	return gulp
		.src('./source/css/main.css')
		.pipe(plumber(errorHandler('compile-css')))
		.pipe(sourcemaps.init())
		.pipe(postcss([
			easyImport({
				glob: true,
			}),
			cssnext(),
			objectFit(),
		]))
		.pipe(csso())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(OUT))
		.pipe(bsync.stream());
});

gulp.task('compile-html', () => {
	return gulp
		.src('source/html/**/*.html')
		.pipe(plumber(errorHandler('compile-html')))
		.pipe(include())
		.pipe(gulp.dest('.'));
});

gulp.task('compile-js', () => {
	return gulp
		.src('source/js/index.js')
		.pipe(plumber(errorHandler('compile-js')))
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(OUT))
		.pipe(browserSync.stream());
});

gulp.task('copy-static', () => {
	return gulp
		.src('source/static/**/*')
		.pipe(plumber(errorHandler('copy-static')))
		.pipe(changed(OUT))
		.pipe(rename(flatten))
		.pipe(gulp.dest(OUT));
});

gulp.task('default', ['copy-images', 'copy-static', 'compile-html', 'compile-css', 'compile-js'],  () => {
	bsync.init({
		server: './',
	});

	gulp.watch('source/css/**/*.css', ['compile-css']);
	gulp.watch('source/html/**/*.html', ['compile-html']).on('change', bsync.reload);
	gulp.watch('source/images/**/*', ['copy-images']).on('change', bsync.reload);
	gulp.watch(['source/js/**/*.js', '!source/js/static/**/*'], ['compile-js']).on('change', bsync.reload);
	gulp.watch('source/static/**/*', ['copy-static']).on('change', bsync.reload);
});
