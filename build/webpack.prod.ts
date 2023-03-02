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
            name: 'mainifels',
        },
        minimize: true
    },
    performance: {
        hints: false,
        maxAssetSize: 4000000,
        maxEntrypointSize: 5000000,
    }
});

export default prodConfig;