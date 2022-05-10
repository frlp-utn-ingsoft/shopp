module.exports = {
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    overrides: [
        {
            files: ['**/*.test.js', '**/*.spec.js'],
            globals: {
                after: true,
                before: true,
                cy: true,
            },
            env: {
                jest: true,
            },
            plugins: ['jest'],
        },
    ],
    extends: ['eslint:recommended'],
};
