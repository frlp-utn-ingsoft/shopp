const Sequelize = require('sequelize');
const db = require('../db.js');
const CartProductModel = require('./cartProduct.js');

/**
 * Modelo de carrito.
 *
 *
 */
const Cart = db.define(
    'Cart',
    {
        // Atributos
        total: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
    },
    { tableName: 'Cart' }
);

/**
 * Crear un carrito nuevo.
 * Parámetro data: JSON con el producto inicial.
 *
 */
const createCart = async (product) => {
    let total = product != null ? product.price : 0.0;

    const cart = await Cart.create({ total: total });

    if (product != null) {
        await cart.addProduct(product, { through: { quantity: 1 } });
        return Cart.findOne({ where: { id: cart.id } });
    }
    return cart;
};

/**
 * Busca un producto de un carrito ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro productId: id del producto a buscar.
 *
 */
const findProductInCart = async (id, productId) => {
    const cart = await Cart.findOne({ where: { id: id } });
    const products = await cart.getProducts();

    return products.find((p) => p.id == productId);
};

/**
 * Agrega un producto a un carrito ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro data: JSON con los atributos del producto a agregar.
 *
 */
const addProductToCart = async (id, product) => {
    const cart = await Cart.findOne({ where: { id: id } });

    if (cart != null) {
        const products = await cart.getProducts();
        const productInCart = products.find((p) => p.id == product.id);

        if (productInCart == undefined) {
            await cart.addProduct(product, { through: { quantity: 1 } });
        } else {
            await CartProductModel.increaseQuantity(cart.id, productInCart.id);
        }

        return cart.update({
            total: cart.total + product.price,
        });
    }
    return null;
};

/**
 * Elimina un producto de un carrito ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro productId: id del producto a borrar.
 *
 */
const removeProductFromCart = async (id, productId) => {
    const cart = await Cart.findOne({ where: { id: id } });

    if (cart != null) {
        const products = await cart.getProducts();
        const productInCart = products.find((p) => p.id == productId);

        if (productInCart !== undefined) {
            if (productInCart.CartProduct.quantity === 1) {
                await cart.removeProduct(productInCart);
            } else {
                await CartProductModel.decreaseQuantity(
                    cart.id,
                    productInCart.id
                );
            }

            await cart.update({
                total: cart.total - productInCart.price,
            });
            return true;
        }
        return false;
    }
    return null;
};

const CartModel = {
    Cart: Cart,
    create: createCart,
    findProductInCart: findProductInCart,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart,
};

module.exports = CartModel;
