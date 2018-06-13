var gulp = require("gulp")
var plugins = require("gulp-load-plugins")()
var runSequence = require("run-sequence")
var browserSync = require("browser-sync")
var watchify = require("watchify")
var browserify = require("browserify")
var mergeStream = require("merge-stream")
var source = require("vinyl-source-stream")
var buffer = require("vinyl-buffer")
var precache = require("sw-precache")

var reload = browserSync.reload

gulp.task("clean", function(done) {
	require("del")(["build"], done)
})

gulp.task("browser-sync", function() {
	browserSync({
		notify: false,
		port: 1515,
		server: "build",
		open: false
	})
})

gulp.task("html", function() {
	return gulp
		.src(["src/index.html"])
		.pipe(
			plugins.swig({
				defaults: { cache: false }
			})
		)
		.pipe(
			plugins.htmlmin({
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				removeAttributeQuotes: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true,
				removeRedundantAttributes: true
			})
		)
		.pipe(gulp.dest("build"))
		.pipe(reload({ stream: true }))
})

gulp.task("sw", function(callback) {
	var rootDir = "build"
	precache.write(
		`${rootDir}/service-worker.js`,
		{
			staticFileGlobs: [rootDir + "/**.html", rootDir + "/js/**.js"],
			stripPrefix: rootDir,
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/hacker-news\.firebaseio\.com\/v0/,
					handler: "networkFirst"
				}
			]
		},
		callback
	)
})

gulp.task("misc", function() {
	return gulp
		.src([
			"src/**",
			"!src/*.html",
			"!src/{js,js/**}"
		])
		.pipe(gulp.dest("build"))
})

function createBundler(src) {
	var b

	if (plugins.util.env.production) {
		b = browserify()
	} else {
		b = browserify({
			cache: {},
			packageCache: {},
			fullPaths: true,
			debug: true
		})
	}

	b.transform("babelify", {
		presets: ["babel-preset-env"]
	})

	if (plugins.util.env.production) {
		b.transform(
			{
				global: true
			},
			"uglifyify"
		)
	}

	b.add(src)
	return b
}

var bundlers = {
	"js/bundle.js": createBundler("./src/js/app/index.js")
}

function bundle(bundler, outputPath) {
	var splitPath = outputPath.split("/")
	var outputFile = splitPath[splitPath.length - 1]
	var outputDir = splitPath.slice(0, -1).join("/")

	return (
		bundler
			.bundle()
			// log errors if they happen
			.on("error", plugins.util.log.bind(plugins.util, "Browserify Error"))
			.pipe(source(outputFile))
			.pipe(buffer())
			.pipe(plugins.sourcemaps.init({ loadMaps: true })) // loads map from browserify file
			.pipe(plugins.sourcemaps.write("./")) // writes .map file
			.pipe(plugins.size({ gzip: true, title: outputFile }))
			.pipe(gulp.dest("build/" + outputDir))
			.pipe(reload({ stream: true }))
	)
}

gulp.task("js", function() {
	return mergeStream.apply(
		null,
		Object.keys(bundlers).map(function(key) {
			return bundle(bundlers[key], key)
		})
	)
})

gulp.task("watch", ["build"], function() {
	gulp.watch(["src/*.html"], ["html"])

	Object.keys(bundlers).forEach(function(key) {
		var watchifyBundler = watchify(bundlers[key])
		watchifyBundler.on("update", function() {
			return bundle(watchifyBundler, key)
		})
		bundle(watchifyBundler, key)
	})
})

gulp.task("build", function() {
	return runSequence("clean", ["misc", "html", "js"], "sw")
})

gulp.task("serve", ["browser-sync", "watch"])
gulp.task("default", ["build"])
