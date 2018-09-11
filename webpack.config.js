const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const path = require('path')
const srcPath = path.join(__dirname, 'src')
const apiMocker = require('webpack-api-mocker')
const mocker = path.resolve(srcPath,'mock/index.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const progressbarWebpack = require('progress-bar-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const __prod__ = process.env.NODE_ENV == 'production' ? true : false

var babelrc = {
    presets:[
        "es2015",
        "stage-2",
        "react"
    ],
    plugins:[
        ["import-glob"],
        ["transform-runtime"],
        ["transform-async-to-generator"],
        ["react-hot-loader/babel"],
        [
          "react-transform",
          {
            "transforms": [
              {
                "transform": "react-transform-hmr",
                "imports": [
                  "react"
                ],
                "locals": [
                  "module"
                ]
              }
            ]
          }
        ],
        [
            "import",
            {
              "libraryName": "antd",
              "style": true
            }
        ]
    ]
}
!__prod__ && babelrc.plugins.push(["dva-hmr"])

var webpackConf = {
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: ('[name].[hash:8].js'),
    //     chunkFilename: ('[name]-[id].[hash:8].js')
    // },
    mode: __prod__ ? 'production' : 'development',
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query: babelrc
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                     "css-hot-loader",
                     "style-loader",
                     "css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                     "less-loader?javascriptEnabled=true&noIeCompat=true",
                ]
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [
                     "css-hot-loader",
                     "style-loader",
                     "css-loader",
                     "less-loader?javascriptEnabled=true&noIeCompat=true",
                ]
            },
            {
                test: /\.css$/,
                use: ["css-hot-loader","css-loader"]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                use:['url-loader?limit=8192']
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                use:['file-loader']
            },
            {
                test: /\.html$/,
                use: ["html-loader?minimize=true"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.NamedModulesPlugin(), // 新增
        new webpack.HotModuleReplacementPlugin(), //新增
        new webpack.DefinePlugin({
            isProd: __prod__
        }),

    ],
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
    				name: "vendor",
    				priority: 10,
    				enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx','less','scss'],
        alias: {
            assets: `${srcPath}/assets/`,
            components: `${srcPath}/components/`,
            router: `${srcPath}/router/`,
            mock: `${srcPath}/mock/`,
            pages: `${srcPath}/pages/`,
            models: `${srcPath}/models/`,
            services: `${srcPath}/services/`,
            utils: `${srcPath}/utils/`,
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        inline:true,
        port: 8033,
        hotOnly: true,
        historyApiFallback: true,
        // progress: true,
        host: "127.0.0.1",
        hot: true,
        before(app){
            apiMocker(app, mocker, {

            })
        }
    }
}

if(__prod__){
    webpackConf.optimization.minimize = true
    webpackConf.plugins.push(
        new CleanWebpackPlugin(
            ['dist/*'],　 //匹配删除的文件
            {
                verbose:false,
                dry: false,
            }
        ),
        new progressbarWebpack()
        // new CompressionPlugin({
        //     asset: '[path].gz[query]'
        // }),
        // new webpack.optimize.AggressiveSplittingPlugin({
        //     minSize: 30000, // 字节，分割点。默认：30720
        //     maxSize: 50000, // 字节，每个文件最大字节。默认：51200
        //     chunkOverhead: 0, // 默认：0
        //     entryChunkMultiplicator: 1, // 默认：1
        // })
    )
}

module.exports = webpackConf
