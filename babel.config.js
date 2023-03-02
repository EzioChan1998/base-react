// 是否开发模式
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
                },
                useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                corejs: 3, // 配置使用core-js使用的版本
                loose: true,
            }, 
        ],
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript",
    ],
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        isDev && require.resolve("react-refresh/babel"),  // 如果是开发模式,就启动react热更新插件
    ].filter(Boolean),
}