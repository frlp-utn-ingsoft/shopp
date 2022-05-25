module.exports = {
    verbose: true,
    testPathIgnorePatterns: ['tests/e2e'],
    transform: {
        '^.+\\.m?js$': 'babel-jest',
    },
};
