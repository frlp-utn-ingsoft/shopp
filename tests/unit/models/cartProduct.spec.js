const CartModel = require('../../../src/models/cart.js');
const CartProductModel = require('../../../src/models/cartProduct.js');
const ProductModel = require('../../../src/models/product.js');
const ProductType = require('../../../src/models/productType.js');

beforeEach(async () => {
    await ProductModel.Product.sync({ force: true });
    await CartModel.Cart.sync({ force: true });
    await CartProductModel.CartProduct.sync({ force: true });
});

test('Obtener la cantidad de un producto en un carrito inexistente', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    const quantity = await CartProductModel.getQuantity(1, product.id)

    expect(quantity).toBeNull();
});

test('Obtener la cantidad de un producto inexistente en un carrito', async () => {
    // Creamos el carrito
    const cart = await CartModel.create();

    const quantity = await CartProductModel.getQuantity(cart.id, 1)

    expect(quantity).toBeNull();
});

test('Obtener la cantidad de un producto en un carrito cuando el producto no fue agregado', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create();

    const quantity = await CartProductModel.getQuantity(cart.id, product.id)

    expect(quantity).toBeNull();
});

test('Obtener la cantidad de un producto en un carrito', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    const quantity = await CartProductModel.getQuantity(cart.id, product.id)

    expect(quantity).toBe(1);
});

test('Obtener la cantidad de un producto en un carrito cuando hay mas de uno', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    // Agregamos item del mismo producto
    await CartModel.addProductToCart(cart.id, product);

    const quantity = await CartProductModel.getQuantity(cart.id, product.id)

    expect(quantity).toBe(2);
});
