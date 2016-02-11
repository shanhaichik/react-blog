var webpack           = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    precss            = require('precss'),
    autoprefixer      = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    postcssImport     = require('postcss-import'),
    clean             = require('clean-webpack-plugin'),
    path              = require('path'),
    PostCssVars       = require('postcss-simple-vars'),
    PostCssFocus      = require('postcss-focus'),
    PostCssReporter   = require('postcss-reporter');


var env = process.env.NODE_ENV || 'development';

module.exports = function makeWebpackConfig(options) {
    /**
     * Environment type
     * BUILD is for generating minified builds
     * TEST is for generating test builds
     */
    var BUILD = !!options.BUILD;
    var TEST  = !!options.TEST;
    var DEV   = !!options.DEV;

    var config = {};

    config.context = __dirname + "/app";

    config.resolve =  {
        modulesDirectories: ["node_modules", "app","app/components"],
        extensions: ["", ".js", ".css"]
    };

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
    if (DEV) {
        config.entry = [
            "webpack-dev-server/client?http://localhost:3000", // Needed for hot reloading
            "webpack/hot/only-dev-server", // See above
            path.resolve(__dirname, '../app/app.js') // Start with js/app.js...
        ];
    }
    else if (BUILD) {
        config.entry = [
            path.resolve(__dirname, '../app/app.js'),
            path.resolve(__dirname, '../app/style/app.css')
        ];
    }
    else if (TEST) {
        config.entry = {};
    }

    /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */

    if (TEST) {
        config.output = {};
    }
    else {
        config.output = {
            // Absolute output directory
            path: path.resolve(__dirname, '../static'),
            // Output path = require(the view of the page
            // Uses webpack-dev-server in development
            publicPath:  '/' ,

            filename:  BUILD ? '[hash].js' : 'bundle.js',

            // Filename for non-entry points
            // Only adds hash in build mode
            chunkFilename: BUILD ? '[hash].js' : 'bundle.js',

            // Output source map
            sourceMapFilename: "[file].map"
        };
    }


    /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
    if (TEST) {
        config.devtool = 'inline-source-map';
    } else if (DEV) {
        //config.devtool = 'source-map';
        config.devtool = '#eval-cheap-module-source-map';
    } else {
        //??
        config.devtool = 'eval';
    }

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
    config.module = {
        preLoaders: [],
        loaders:[
            {
                test: /\.js?$/, // Transform all .js files required somewhere within an entry point...
                loaders: ['react-hot', 'babel','required'],
                exclude: /(node_modules|bower_components)/,
                include: path.join(__dirname, '../app')
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file?name=images/[name].[ext]',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(mp4|webm|ogg)$/,
                loader: 'file?name=video/[name].[ext]',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(html)$/,
                loader: 'file?name=html/[name].[ext]',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.json$/,
                loader: 'json',
                exclude: /(node_modules|bower_components)/
            }
        ]
    };

    /**
     * ISPARTA LOADER
     * Reference: https://github.com/ColCh/isparta-instrumenter-loader
     * Instrument JS files with Isparta for subsequent code coverage reporting
     * Skips node_modules and files that end with .test.js
     * */
    if (TEST) {
        config.module.preLoaders.push({
            test: /(\.jsx)|(\.js)$/,
            // exclude this dirs from coverage
            exclude: /(test|node_modules|bower_components)\//,
            loader: 'isparta-instrumenter-loader'
        });
    }

    var cssLoader = {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]!postcss')
    };

    // Skip loading css in test mode
    if (TEST) {
        // Reference: https://github.com/webpack/null-loader
        // Return an empty module
        cssLoader.loader = 'null'
    }

    // Add cssLoader to the loader list
    config.module.loaders.push(cssLoader);

    /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
    config.postcss = function() {
        return  [
            postcssImport({
                glob: true,
                onImport: function (files) {
                    files.forEach(this.addDependency);
                }.bind(this)
            }),
            PostCssVars,
            precss,
            PostCssFocus,
            autoprefixer({browsers: ['last 2 versions']}),
            PostCssReporter({ // This plugin makes sure we get warnings in the console
                clearMessages: true
            })
        ]
    };

    // Make web variables accessible to webpack, e.g. window
    config.target = 'web';

    // Don't show stats in the console
    config.stats  = false;

    config.progress = true;

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * Reference: https://github.com/johnagan/clean-webpack-plugin
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    config.plugins = [
        new ExtractTextPlugin("ExtractTextPlugin", (DEV) ? "[name].css" : "[hash].css", {
            allChunks: true
        })
    ];

    // Clean build
    if (BUILD || DEV) {
        config.plugins.push(
            new clean(['static'], {
                root: path.resolve(__dirname, '../')
            })
        );
    }

    // Add build and dev specific plugins
    if (BUILD || DEV) {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify(env) }
            }),
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin(),


            // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
            // Dedupe modules in the output
            new webpack.optimize.DedupePlugin(),

            new webpack.optimize.OccurenceOrderPlugin()
        )
    }

    if (DEV) {
        config.plugins.push(
            // Make hot loading work
            new webpack.HotModuleReplacementPlugin()
        )
    }

    // Add  build minify
    if(BUILD) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
            // Minify all javascript, switch loaders to minimizing mode
            new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
                compress: {
                    warnings: false // ...but do not show warnings in the console (there is a lot of them)
                }
            })
        )
    }

    // Skip rendering index.html in test mode
    if (!TEST) {
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        // Render index.html
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../app/index.html'),
                inject: 'body',
                filename:'html/index.html',
                minify:  { // Minifying it while it is parsed
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true
                }
            })
        )
    }

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */

    return config;
};