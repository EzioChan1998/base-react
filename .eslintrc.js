module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended', // 解决eslint和prettier冲突
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: "module"
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.ts', '.jsx', '.tsx'] }],
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'no-unused-expressions': 'off',
        'no-plusplus': 0,
        'no-restricted-syntax': 0,
        'consistent-return': 0,
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off', // 关闭默认使用 export default 方式导出
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        '@typescript-eslint/no-use-before-define': 0,
        'no-use-before-define': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        'no-shadow': 'off',
        'no-console': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                '': 'never',
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
    settings: {
        'import/extensions': ['.js', '.ts', '.jsx', '.tsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import-resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.ts', '.jsx', '.tsx'],
                moduleDirectory: ['node_modules', 'src/']
            }
        },
        "react": {
            "version": "detect",
        }
    }
}