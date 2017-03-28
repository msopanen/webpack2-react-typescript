exports.common = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [ { loader: "tslint-loader" } ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ],
    },
});

exports.production = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [ { loader: "awesome-typescript-loader" } ]
            }
        ],
    },
});

exports.development = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [ 
                    { loader: "react-hot-loader/webpack" },
                    { loader: "awesome-typescript-loader" } ]
            }
        ],
    },
});

exports.devServer = ({ host, port, publicPath } = {}) => ({
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    stats: 'errors-only',
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});