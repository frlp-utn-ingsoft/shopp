const CartModel = require('../../../src/models/cart.js');
const CartProductModel = require('../../../src/models/cartProduct.js');
const ProductModel = require('../../../src/models/product.js');
const ProductType = require('../../../src/models/productType.js');

beforeEach(async () => {
    await ProductModel.Product.sync({ force: true });
    await CartModel.Cart.sync({ force: true });
    await CartProductModel.CartProduct.sync({ force: true });
});

test('Crear carrito vacío', async () => {
    // Creamos el carrito
    const cart = await CartModel.create();

    // Obtenemos los productos de ese carrito
    const products = await cart.getProducts();

    expect(products.length).toBe(0);
    expect(cart.total).toBe(0);
});

test('Crear carrito con un producto', async () => {
    const productData = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    // Creamos el producto
    const product = await ProductModel.create(productData);

    // Creamos el carrito
    const cart = await CartModel.create(product);

    // Obtenemos los productos de ese carrito
    const products = await cart.getProducts();

    expect(products.length).toBe(1);
    expect(cart.total).toBe(productData.price);
    expect(products[0].CartProduct.quantity).toBe(1);
});

test('Agregar producto nuevo al carrito', async () => {
    const productDataFirst = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    const productDataSecond = {
        price: 5000.0,
        type: ProductType.ELECTRONICS,
        name: 'Tostadora',
    };

    // Creamos los productos
    const productFirst = await ProductModel.create(productDataFirst);
    const productSecond = await ProductModel.create(productDataSecond);

    // Creamos el carrito con el primer producto
    const cart = await CartModel.create(productFirst);

    // Obtenemos los productos de ese carrito
    const products = await cart.getProducts();

    expect(products.length).toBe(1);
    expect(cart.total).toBe(productDataFirst.price);

    // Agregamos el segundo producto
    const cartUpdated = await CartModel.addProductToCart(cart.id, productSecond);

    // Obtenemos los productos actualizados
    const productsUpdated = await cartUpdated.getProducts();

    expect(productsUpdated.length).toBe(2);
    expect(cartUpdated.total).toBe(productDataFirst.price + productDataSecond.price);
});

test('Sumar item a producto del carrito', async () => {
    const productDataFirst = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    const productDataSecond = {
        price: 5000.0,
        type: ProductType.ELECTRONICS,
        name: 'Tostadora',
    };

    // Creamos los productos
    const productFirst = await ProductModel.create(productDataFirst);
    const productSecond = await ProductModel.create(productDataSecond);

    // Creamos el carrito con el primer producto
    const created = await CartModel.create(productFirst);

    // Agregamos el segundo producto
    const cart = await CartModel.addProductToCart(created.id, productSecond);

    // Obtenemos los productos de ese carrito
    const products = await cart.getProducts();

    expect(products.length).toBe(2);
    expect(products[0].CartProduct.quantity).toBe(1);

    // Agregamos item del mismo producto
    const cartUpdated = await CartModel.addProductToCart(cart.id, productFirst);

    // Obtenemos los productos actualizados
    const productsUpdated = await cartUpdated.getProducts();

    expect(productsUpdated.length).toBe(2);
    expect(productsUpdated[0].CartProduct.quantity).toBe(2);
});

test('Buscar producto en un carrito', async () => {
    const productDataFirst = {
        price: 50000.0,
        type: ProductType.HOME,
        name: 'Placard',
    };

    const productDataSecond = {
        price: 5000.0,
        type: ProductType.ELECTRONICS,
        name: 'Tostadora',
    };

    // Creamos los productos
    const productFirst = await ProductModel.create(productDataFirst);
    const productSecond = await ProductModel.create(productDataSecond);

    // Creamos el carrito con el primer producto
    const cart = await CartModel.create(productFirst);

    // Agregamos el segundo producto
    await CartModel.addProductToCart(cart.id, productSecond);

    const product = await CartModel.findProductInCart(cart.id, productFirst.id);

    expect(product).not.toBeNull();
    expect(product.id).toBe(productFirst.id);
});
