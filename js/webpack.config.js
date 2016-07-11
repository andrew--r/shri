var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './js/index.js',
	output: {
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	plugins: [
		new HTMLWebpackPlugin({
			template: './html/index.html',
			hash: true,
			minify: {
				collapseWhitespace: true,
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
			},
		}),
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
			},
		],
	},
};
