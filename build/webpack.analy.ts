const prodConfig = require('./webpack.prod.ts') // 引入打包配置
import SpeedWebpackPlugin from 'speed-measure-webpack-plugin';  // 引入webpack打包速度分析插件
const { merge } = require('webpack-merge');
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const smp = new SpeedWebpackPlugin();

module.exports = smp.wrap(merge(prodConfig, {
    plugins: [
        new BundleAnalyzerPlugin() // 配置分析打包结果插件
    ]
}));