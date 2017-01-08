/**
 * webpack 2 config for react and typescript with following features
 * - tree shaking
 * - dev server hot module replacement
 */
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.join(__dirname, './src/main');
const distDir = path.join(__dirname, './dist');

const isProduction = process.argv.indexOf('-p') !== -1;

const plugins = [
    new webpack.NamedModulesPlugin(),
    /** 
     * split bundles into two chunks. one for the 3rd-party libraries
     * and one for the own code.
     */
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'vendor', 
      filename: 'vendor.bundle.js'
    }),
    /**
     * autogenerate index.html from givent template with hash
     */
    new HtmlWebpackPlugin({
      title: 'Hello React',
      filename: 'index.html',
      template: 'src/main/index.html',
      hash: true,
      inject: 'body',
    }),

    new webpack.LoaderOptionsPlugin({
        minimize: isProduction,
        debug: !isProduction,
        options: {
            tslint: {
                emitErrors: true,
                failOnHint: true,
                typeCheck: true
            }
        }
    })
];

if (isProduction) {

    console.log("Making production build")

    // Uglify production build
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { 
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true, 
                passes: 1,
            },
            sourceMap: false
        })
    )
    // Clean dist folder in case of the production build
    plugins.push(new CleanWebpackPlugin([distDir]))

} else {
    console.log("Making development build")
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
 
module.exports = {
    entry: {
        app: './src/main/index.tsx',
        vendor: ['react','react-dom'],
    },
    output: {
        path: distDir,
        filename: 'bundle.min.js',
    },
    devtool: isProduction ? undefined : 'source-map',
    resolve: {
        extensions: [
            '.ts', '.tsx',
            '.js', '.jsx',
        ],
    },
    module: {
        rules: [
            {
                /**
                 * pre loader for checking TypeScript rules
                 */
                enforce: 'pre',
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [ { loader: 'tslint-loader' } ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [ { loader: 'awesome-typescript-loader' } ]
            },
            {
                /**
                 * inline css along to js code configuration
                 */
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
        ],
    },
    plugins,
    devServer: {
        contentBase: srcDir,
  }
}