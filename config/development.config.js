const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./common.config");
const modules = require("./modules");

const cfg = merge([
    {
        entry: {
            app: [ 
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://localhost:3000',
                'webpack/hot/only-dev-server',               
                './index.tsx' 
            ],
            vendor: ["react","react-dom"]
        },
        devtool: "source-map",
        plugins: [

            new webpack.HotModuleReplacementPlugin(),

            new webpack.NamedModulesPlugin(),

            new webpack.NoEmitOnErrorsPlugin()

        ],
    },
    
    modules.common({}),
    modules.development({})
]);

module.exports = merge(common, cfg);