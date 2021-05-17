const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = (dir) => {
    return path.resolve(process.cwd(), dir)
}
module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    plugins: [new HtmlWebpackPlugin({
        filename:resolve("public/index.html")
    })],

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        compress: true,
        http2: true,
        port: 9000,
        disableHostCheck: true
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            // { test: /\.md$/, use: "raw-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    resolve: {
        // 解析模块请求的选项
        // （不适用于对 loader 解析）
        modules: [
            "node_modules",
            resolve("src")
        ],
        // 用于查找模块的目录

        extensions: [".js", ".ts", ".tsx"],

        alias: {
            '@constants': resolve('src/constants'),
            '@interface': resolve('src/interface'),
            '@event': resolve('src/event'),
            '@components': resolve('src/components'),
            '@utils': resolve('src/utils')
        }
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};