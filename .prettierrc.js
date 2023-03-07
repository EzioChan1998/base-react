// .prettierrc.js
module.exports = {
    tabWidth: 2,                 //  一个tab几个空格
    useTabs: false,              // 是否启用tab取代空格符缩进，.editorconfig设置空格缩进，所以设置为false
    printWidth: 80,              // 一行的字符数，超过会换行
    semi: true,                  // 行尾是否有分号
    singleQuote: true,           // 是否使用单引号
    trailingComma: 'none',       // 对象或数组结尾是否添加逗号
    jsxSingleQuote: false,       // 是否JSX中使用单引号
    bracketSpacing: true,        // 对象大括号是否有空格
    arrowParens: 'always',       // 箭头函数如果只有一个参数则省略括号
}