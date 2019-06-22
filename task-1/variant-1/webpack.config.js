const path = require('path'),
	webpack = require('webpack');


const APP_DIR = path.resolve(__dirname, 'client');

module.exports = {
  entry: path.resolve(__dirname, 'js', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: ['/node_modules/'],
				use: [{
						loader: 'babel-loader',
						options: {
							compact: true
						}
				}]
			},
		]
	}
};
