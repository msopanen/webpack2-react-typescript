const webpack = require("webpack");
const merge = require("webpack-merge");

const common = require("./common.config");
const modules = require("./modules");

const cfg = merge([
    {
        entry: {
            app: "./index.tsx",
            vendor: ["react","react-dom"]
        },
        devtool: false,
        plugins: [

        ],
    },

    modules.common({}),
    modules.production({})
]);

module.exports = merge(common, cfg);