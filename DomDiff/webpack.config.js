const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        index: path.resolve(__dirname, "./src/js/index.js")
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "./dist")
    },
    devtool: "source-map",
    resolve: {
        modules: [path.resolve(__dirname, ""), path.resolve(__dirname, "./node_modules")],
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html")
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        open: true
    }
}