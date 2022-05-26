module.exports = {
    verbose: true,
    testPathIgnorePatterns: ['tests/e2e'],
    transform: {
        '^.+\\.m?js$': 'babel-jest',
    },
    coverageThreshold: {
        global: {
            lines: 85,
        },
    },
};
