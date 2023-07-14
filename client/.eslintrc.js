module.exports = {
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'commonjs',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: '18.2',
        },
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react', 'react-hooks'],
    rules: {
        'semi': 'off',
    },
};
