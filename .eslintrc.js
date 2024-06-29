module.exports = {
    env: {
        browser: true, commonjs: true, es2021: true, node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: "@typescript-eslint/parser",
    overrides: [{
        env: {
            node: true,
        }, files: ['.eslintrc.{js,cjs}'], parserOptions: {
            sourceType: 'script',
        },
    },],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: [
        "@typescript-eslint",
    ],
    rules: {
        quotes: ['error', 'single'],
        '@typescript-eslint/no-var-requires': 'off',
    },
    globals: {
        process: 'readonly',
    },
};
