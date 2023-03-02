import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from "./webpack.base";
import CopyPlugin from "copy-webpack-plugin";
// import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

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
        // new BundleAnalyzerPlugin() // 配置分析打包结果插件
    ]
});

export default prodConfig;