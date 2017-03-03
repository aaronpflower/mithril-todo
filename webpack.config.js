const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'cheap-module-source-map',
    stats: 'minimal',

    plugins: [HTMLWebpackPluginConfig],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000
    },

    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
            },
            // {
            //     test: /\.css$/,
            //     loader: extractText(cssLoader),
            // },
            // {
            //     test: /\.styl$/,
            //     loader: extractText([cssLoader, stylusLoader]),
            // },
        ]
    },
    resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'client'),
		],
	},
 };
