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

/**
 * Obtiene la cantidad del mismo producto dentro de un carrito.
 * Parámetro id: id a buscar en la base de datos.
 * Parámetro productId: id del producto a buscar.
 *
 */
 const getQuantity = (
    cartId,
    productId
) => {
    return CartProduct.findOne({ where: { cartId: cartId, productId: productId } }).then((cartProduct) => {
        if (cartProduct != null)
            return cartProduct.quantity;
        return null;
    })
}

const CartProductModel = {
    CartProduct: CartProduct,
    getQuantity: getQuantity
};

module.exports = CartProductModel;
