const Models = require('../../../src/models/index.js');
const CartModel = require('../../../src/models/cart.js');
const CartProductModel = require('../../../src/models/cartProduct.js');
const ProductModel = require('../../../src/models/product.js');
const ProductType = require('../../../src/models/productType.js');

beforeEach(async () => {
    await Models.createTables();
});

test('Obtener la cantidad de un producto en un carrito inexistente', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    const quantity = await CartProductModel.getQuantity(1, product.id);

    expect(quantity).toBeNull();
});

test('Obtener la cantidad de un producto inexistente en un carrito', async () => {
    // Creamos el carrito
    const cart = await CartModel.create();

    const quantity = await CartProductModel.getQuantity(cart.id, 1);

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

    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

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

    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

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

    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

    expect(quantity).toBe(2);
});

test('Obtener la cantidad de un producto en un carrito luego de borrar el unico', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    // Obtenemos la cantidad
    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

    expect(quantity).toBe(1);

    // Borramos el unico item
    await CartModel.removeProductFromCart(cart.id, product.id);

    // Obtenemos la cantidad actualizada
    const quantityUpdated = await CartProductModel.getQuantity(
        cart.id,
        product.id
    );

    expect(quantityUpdated).toBeNull();
});

test('Obtener la cantidad de un producto en un carrito luego de borrar un item', async () => {
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

    // Obtenemos la cantidad
    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

    expect(quantity).toBe(2);

    // Borramos uno de los dos items del mismo producto
    await CartModel.removeProductFromCart(cart.id, product.id);

    // Obtenemos la cantidad actualizada
    const quantityUpdated = await CartProductModel.getQuantity(
        cart.id,
        product.id
    );

    expect(quantityUpdated).toBe(1);
});

test('Aumentar la cantidad de un producto inexistente en un carrito', async () => {
    // Creamos el carrito
    const cart = await CartModel.create();

    const quantity = await CartProductModel.increaseQuantity(cart.id, 1);

    expect(quantity).toBeNull();
});

test('Aumentar la cantidad de un producto en un carrito', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    // Obtenemos la cantidad de items del producto
    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

    expect(quantity).toBe(1);

    // Aumentamos la cantidad de items en 1
    const quantityUpdated = await CartProductModel.increaseQuantity(
        cart.id,
        product.id
    );

    expect(quantityUpdated).toBe(2);
});

test('Disminuir la cantidad de un producto inexistente en un carrito', async () => {
    // Creamos el carrito
    const cart = await CartModel.create();

    const quantity = await CartProductModel.decreaseQuantity(cart.id, 1);

    expect(quantity).toBeNull();
});

test('Disminuir la cantidad de un producto en un carrito', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    // Obtenemos la cantidad de items del producto
    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

    expect(quantity).toBe(1);

    // Aumentamos la cantidad de items en 1
    const quantityUpdated = await CartProductModel.increaseQuantity(
        cart.id,
        product.id
    );

    expect(quantityUpdated).toBe(2);

    // Disminuimos la cantidad de items en 1
    const quantityDecreased = await CartProductModel.decreaseQuantity(
        cart.id,
        product.id
    );

    expect(quantityDecreased).toBe(1);
});

test('Disminuir la cantidad de un producto en un carrito cuando habia un item', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    // Obtenemos la cantidad de items del producto
    const quantity = await CartProductModel.getQuantity(cart.id, product.id);

    expect(quantity).toBe(1);

    // Intentamos disminuir la cantidad en 1
    const quantityUpdated = await CartProductModel.decreaseQuantity(
        cart.id,
        product.id
    );

    expect(quantityUpdated).toBeNull();
});
