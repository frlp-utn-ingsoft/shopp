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
        }
    },
    { tableName: 'Cart' }
);

/**
 * Crear un carrito nuevo.
 * Parámetro data: JSON con el producto inicial.
 *
 */
 const createCart = (
    product
) => {
    let total = product != null ? product.price : 0.0

    return Cart.create({ total: total }).then((cart) => {
        if (product != null) {
            cart.addProduct(product, { through: { quantity: 1 } });
            return Cart.findOne({ where: { id: cart.id } });
        }
        return cart;
    });
};

/**
 * Busca un producto de un carrito ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro productId: id del producto a buscar.
 *
 */
const findProductInCart = (
    id,
    productId
) => {
    return Cart.findOne({ where: { id: id } }).then((cart) => {
        return cart.getProducts().then((products) => {
            return products.find((p) => p.id == productId);
        });
    })
}

/**
 * Agrega un producto a un carrito ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro data: JSON con los atributos del producto a agregar.
 *
 */
 const addProductToCart = (
    id,
    product
) => {
    return Cart.findOne({ where: { id: id } }).then((cart) => {
        if (cart != null) {
            return cart.getProducts().then((products) => {
                const productInCart = products.find((p) => p.id == product.id);

                if (productInCart == undefined) {
                    cart.addProduct(product, { through: { quantity: 1 } });
                } else
                    CartProductModel.increaseQuantity(cart.id, productInCart.id)

                return cart.update({
                    total: cart.total + product.price
                })
            })
        }
        return null;
    });
};

/**
 * Elimina un producto de un carrito ya existente.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro productId: id del producto a borrar.
 *
 */
 const removeProductFromCart = (
    id,
    productId
) => {
    return Cart.findOne({ where: { id: id } }).then((cart) => {
        if (cart != null) {
            return cart.getProducts().then((products) => {
                const productInCart = products.find((p) => p.id == productId);

                if (productInCart !== undefined) {
                    if (productInCart.CartProduct.quantity === 1) {
                        cart.removeProduct(productInCart);
                    } else
                        CartProductModel.decreaseQuantity(cart.id, productInCart.id)

                    cart.update({
                        total: cart.total - productInCart.price
                    })
                    return true
                }
                return false
            });
        }
        return null;
    });
};

const CartModel = {
    Cart: Cart,
    create: createCart,
    findProductInCart: findProductInCart,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart
};

module.exports = CartModel;
