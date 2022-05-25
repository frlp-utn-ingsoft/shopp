const fetch = require('node-fetch');

const server = require('../../src/index.js');
const fixture = require('../../fixtures/index.js');

let instance;

beforeEach(async () => {
    await fixture.insertIntoDB();
    instance = await server.start();
});

afterEach(async () => {
    await instance.close();
});

test('Deberia retornar 200 ok cuando se hace un request a la home', async () => {
    const port = instance.address().port;
    const resp = await fetch(`http://localhost:${port}/`);
    expect(resp.status).toBe(200);
});

test('Deberia utilizar bootstrap 5.2', async () => {
    const port = instance.address().port;
    const resp = await fetch(`http://localhost:${port}/`);
    const html = await resp.text();

    expect(html).toMatch('bootstrap@5.2.0');
});
