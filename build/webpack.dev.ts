import { merge } from 'webpack-merge';
// import webpack from 'webpack';
import { Configuration as WebpackConfiguration } from 'webpack';
// import WebpackDevServer from "webpack-dev-server";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import baseConfig from "./webpack.base";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import path from 'path';
// const openBrowser = require("./utils/openBrowser.js");

interface configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration,
}

const host = 'localhost';
const port = 8848;

const devConfig:configuration = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new ReactRefreshPlugin(),  // 添加热更新插件
    ],
    devServer: {
        host, // 地址
        port, // 端口
        open: true, // 是否自动打开
        compress: false, // gzip压缩
        hot: true, //热更新
        historyApiFallback: true,  // 解决history路由404问题
        setupExitSignals: true,  // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
        static: {
            directory: path.join(__dirname, '../public'),  // 托管静态资源public文件夹
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    }
});

// const devServer = new WebpackDevServer({
//
// }, webpack(devConfig));
//
// devServer.start().then(() => {
//     openBrowser(`http://${host}:${port}`);
// })

export default devConfig;