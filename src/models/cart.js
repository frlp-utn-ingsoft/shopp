const Sequelize = require('sequelize');

const db = require('../db.js');

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
                    return cart.addProduct(product, { through: { quantity: 1 } }).then(() => {
                        return cart.update({
                            total: cart.total + product.price
                        });
                    });
                } else {
                    return cart.removeProduct(productInCart).then(() => {
                        return cart.addProduct(
                            productInCart,
                            { through: { quantity: productInCart.CartProduct.quantity + 1 } }
                        ).then(() =>
                            cart.update({
                                total: cart.total + productInCart.price
                            })
                        )
                    });
                }
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
            let productIndex = -1;
            const productInCart = cart.products.find((p, index) => {
                if (p.id == productId) {
                    productIndex = index;
                    return true;
                }
            });

            if (productIndex > -1)
                return cart.update({
                    products: cart.products.splice(productInCart, 1),
                    total: cart.total - (productInCart.price * productInCart.CartProduct.quantity)
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
