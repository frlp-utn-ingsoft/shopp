process.env.NODE_ENV = 'test';
const server = require('../../../src/index.js');
const fixture = require('../../../fixtures/index.js');

module.exports = function (on) {
    let serverInstance;

    on('after:run', () => {
        serverInstance.close();
        return null;
    });

    on('task', {
        seed: () => {
            return fixture.insertIntoDB();
        },
    });

    return server.start().then((instance) => {
        serverInstance = instance;

        return {
            baseUrl: `http://localhost:${serverInstance.address().port}`,
        };
    });
};
