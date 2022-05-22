const Sequelize = require('sequelize');
const CartModel = require('./cart.js');
const ProductModel = require('./product.js');

const db = require('../db.js');

/**
 * Modelo de producto del carrito.
 *
 *
 */
const CartProduct = db.define(
    'CartProduct',
    {
        // Atributos
        quantity: {
            type: Sequelize.NUMBER,
            allowNull: false,
        },
    },
    { tableName: 'CartProduct' }
);

CartModel.Cart.belongsToMany(ProductModel.Product, { through: CartProduct });
ProductModel.Product.belongsToMany(CartModel.Cart, { through: CartProduct });

const CartProductModel = {
    CartProduct: CartProduct,
};

module.exports = CartProductModel;
