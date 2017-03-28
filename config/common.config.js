const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const cfg = {

    context: path.join(__dirname, '../src/main'),
    
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: "[name].[hash].bundle.js",
		chunkFilename: "[id].[hash].bundle.js"
    },
    
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
    },
    
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ 
            name: 'vendor', 
            filename: 'vendor.bundle.js'
        }),

        new HtmlWebpackPlugin({
            title: 'Hello React',
            filename: 'index.html',
            template: 'index.html',
            hash: true,
            inject: 'body',
        })
    ],
}

module.exports = cfg;