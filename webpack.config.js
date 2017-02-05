const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

function extractText(loader) {
	return isDev ?
		['style-loader'].concat(loader) :
		ExtractTextPlugin.extract({
			loader,
			fallbackLoader: 'style-loader',
		})
}

const cssLoader = {
	loader: 'css-loader',
	query: {
		localIdentName: '[name]__[local]__[hash:base64:5]',
		sourceMap: true,
		modules: true,
		camelCase: true,
	},
}

const stylusLoader = {
	loader: 'stylus-loader',
	options: {
		preferPathResolver: 'webpack',
		set: { paths: ['client'] },
	},
}

module.exports = {
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'cheap-module-source-map',
    stats: 'minimal',

    plugins: [
        new HtmlWebpackPlugin(),
        !isDev && new ExtractTextPlugin('[name]-[contenthash].css')
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3000
    },

    module: {
        rules: [
            {
                test: /.js$/,
                loaders: 'buble-loader',
                include: path.join(__dirname, 'client'),
                query: {
                    objectAssign: 'Object.assign',
                },
            },
            {
                test: /\.css$/,
                loader: extractText(cssLoader),
            },
            {
                test: /\.styl$/,
                loader: extractText([cssLoader, stylusLoader]),
            },
        ]
    },
    resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'client'),
		],
	},
 };
