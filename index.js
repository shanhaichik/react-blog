const app = require('./server');

if(process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    var WebpackDevServer = require('webpack-dev-server');
    var configWebpack = require('./webpack/webpack.dev');

    new WebpackDevServer(webpack(configWebpack), {
        publicPath: configWebpack.output.publicPath,
        hot: true,
        inline: false,
        historyApiFallback: true,
        quiet: true,
        noInfo: false
    }).listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Webpack работает на 3000 порту');
        }
    });
}

/*if (!module.parent) {
    app.listen(7000, function (err) {
        if (err) {
            console.log('Произошла ошибка в Listen');
            process.exit(10);
        }
        console.log(config.notice);
    });
}*/
