var webpack = require('webpack');

module.exports = {
	entry: './source/js/index.js',
	output: {
		filename: 'bundle.js',
	},
	devtool: 'source-map',
	plugins: [
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
