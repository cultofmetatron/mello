var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = {
	context: __dirname + "/frontend",
    entry: {
        app: ["webpack/hot/dev-server", "./src/scripts/app.js"]
    },
    module: {
        loaders: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            }
        ]
    },
    output: {
        path: __dirname + "/frontend/build/scripts",
        filename: "app.js"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}; 


gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        // server and middleware options
        contentBase: __dirname + "/frontend/build",
        noInfo: false, //  --no-info option
        hot: true,
        inline: true
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});


gulp.task("build-dev", ["webpack"], function() {
	gulp.watch(["frontend/src/**/*.js"], ["webpack"]);
    gulp.run(['webpack-dev-server']);
});


