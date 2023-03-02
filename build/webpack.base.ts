import {DefinePlugin, Configuration} from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as dotenv from 'dotenv';
import WebpackBar from 'webpackbar';
const path  = require("path");

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

// 获取envConfig
const envConfig = dotenv.config({
    path: path.resolve(__dirname, "../env/.env." + process.env.BASE_ENV),
});

const cssRegex = /\.css$/;
const lessRegex = /\.less$/;

const styleLoaderArray = [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    {
        loader:  "css-loader",
        options: {
            modules: {
                //localIdentName：配置生成的css类名组成（path路径，name文件名，local原来的css类名, hash: base64:5拼接生成hash值5位，具体位数可根据需要设置）。
                localIdentName: "[path][name]__[local]--[hash:5]",
            }
        }
    },
    "postcss-loader",
]

const baseConfig:Configuration = {
    entry: path.join(__dirname, "../src/index.tsx"),
    // 出口
    output: {
        filename: "static/js/[name].[chunkhash:8].js", // 每个输出js的名称
        path: path.join(__dirname, "../dist"), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: "/", // 打包后文件的公共前缀路径
        // ... 这里自定义输出文件名的方式是，将某些资源发送到指定目录
        assetModuleFilename: "images/[hash][ext][query]",
    },
    cache: {
        type: "filesystem"
    },
    //loader配置
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                // thread-loader 开启多线程loader
                use: ["thread-loader", "babel-loader"],
                // 排除  node_modules
                exclude: /node_modules/,
            },
            {
                test: cssRegex,
                use: styleLoaderArray,
            },
            {
                test: lessRegex,
                use: [
                    ...styleLoaderArray,
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                importLoaders: 2,
                                // 可以加入modules: true，这样就不需要在less文件名加module了
                                modules: true,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 小于20kb转base64
                    },
                },
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext][query]',  // 文件输出目录和命名
                }
            },
            {
                // 处理字体文件
                test: /.(woff2?|eot|ttf|otf)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10KB转base64,
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext][query]', // 文件输出目录和命名
                },
            },
            {
                // 处理媒体文件
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 * 1024, // 小于10MB转base64,
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext][query]', // 文件输出目录和命名
                },
            },
            {
                test: /\.json$/,
                type: 'asset/source',
                generator: {
                    filename: "static/json/[name].[contenthash:8][ext][query]",
                }
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", ".less", ".css"],
        alias: {
            "@": path.join(__dirname, '../src'),
        },
        modules: [path.join(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找
    },
    //plugin配置
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack5-react-ts",
            filename: "index.html",
            template: path.join(__dirname, "../public/index.html"),
            inject: true, // 自动注入静态资源
            hash: true,
            cache: false,
            // 压缩
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true, //去空格
                removeComments: true, // 去注释
                minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
                minifyCSS: true, // 缩小CSS样式元素和样式属性
            },
            nodeModules: path.resolve(__dirname, "../node_modules"),
        }),
        new DefinePlugin({
            "process.env": JSON.stringify(envConfig.parsed),
            "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        new WebpackBar({
            color: "#85d", // 默认green，进度条颜色支持HEX
            basic: false,  // 默认true，启用一个简单的日志报告器
            profile: false,  // 默认false，启用探查器。
        })
    ].filter(Boolean),
};

export default baseConfig;