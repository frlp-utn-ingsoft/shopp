module.exports = {
    ci: {
        collect: {
            url: ['http://localhost:3000/'],
            numberOfRuns: 2,
        },
        assert: {
            preset: 'lighthouse:recommended',
            assertions: {
                'apple-touch-icon': 'off',
                'csp-xss': 'off',
                'installable-manifest': 'off',
                'maskable-icon': 'off',
                'service-worker': 'off',
                'splash-screen': 'off',
            },
        },
    },
};
