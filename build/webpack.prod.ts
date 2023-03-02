import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from "./webpack.base";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from 'terser-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

const path = require('path');

const prodConfig: Configuration = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), // 复制public下文件
                    to: path.join(__dirname, '../dist'),  // 复制到dist目录中
                    filter: (source: string) => !source.includes('index.html'),  // 忽略index.html
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
        }),
        // 打包时生成gzip文件
        new CompressionPlugin({
            test: /\.(js|css)$/, // 只生成css,js压缩文件
            filename: '[path][base].gz',  // 文件命名
            algorithm: 'gzip',  // 压缩格式,默认是gzip
            threshold: 10 * 2 << 10, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率,默认值是 0.8
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // 压缩css
            new TerserPlugin({
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 删除console.log
                    }
                }
            })
        ],
        runtimeChunk: {
            name: 'manifest',
        },
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendors: { // 提取node_modules代码
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                commons: { // 提取页面公共代码
                    name: 'common', // 提取文件命名为common
                    minChunks: 2, // 使用2次及以上就提取
                    chunks: "initial", // 只提取初始化就能获取到的模块
                    minSize: 0, // 提取代码体积大于0就提取出来
                }
            }
        }
    },
    performance: {
        hints: false,
        maxAssetSize: 4000000,
        maxEntrypointSize: 5000000,
    },
});

export default prodConfig;