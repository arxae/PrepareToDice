var gulp = require("gulp");
var ts = require("gulp-typescript");
var minify = require("gulp-minify");
var runsequence = require("run-sequence");

gulp.task("default", function() {
	runsequence("build", "minify")
});

gulp.task("build", function() {
	return gulp.src("typescript/src/**/*.ts")
		.pipe(ts({ out: "app.js" }))
		.pipe(gulp.dest("js"));
});

gulp.task("minify", function() {
	return gulp.src("js/app.js")
		.pipe(minify())
		.pipe(gulp.dest("js"));
});
