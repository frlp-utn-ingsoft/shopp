/**
 * @jest-environment jsdom
 */

const utils = require('../../ui-utils.js')

const { getByText, getByAltText } = require('@testing-library/dom');
require('@testing-library/jest-dom');

function renderProduct(product) {
    return utils.renderString(
        '_product-card.html',
        `{{ productCard(product) }}`,
        { product }
    );
}

describe('Tarjeta de producto', () => {
    test('Deberia tener el nombre del producto', async () => {
        const html = renderProduct({
            name: 'Placard',
            type: 'home',
            price: 100,
        });
        document.body.innerHTML = html;

        expect(getByText(document.body, 'Placard')).toBeVisible();
    });

    test('Deberia tener el tipo del producto', async () => {
        const html = renderProduct({
            name: 'Placard',
            type: 'home',
            price: 100,
        });
        document.body.innerHTML = html;

        expect(getByText(document.body, 'home')).toBeVisible();
    });

    test('Deberia tener el precio del producto', async () => {
        const html = renderProduct({
            name: 'Placard',
            type: 'home',
            price: 100,
        });
        document.body.innerHTML = html;

        expect(getByText(document.body, '$ 100')).toBeVisible();
    });

    test('Deberia tener una imagen con el attributo alt correcto', async () => {
        const product = {
            name: 'Placard',
            type: 'home',
            price: 100,
        };
        const html = renderProduct(product);
        document.body.innerHTML = html;

        expect(
            getByAltText(document.body, `foto de un ${product.name}`)
        ).toBeVisible();
    });
});
