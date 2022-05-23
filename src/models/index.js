const CartModel = require('./cart.js');
const CartProductModel = require('./cartProduct.js');
const ProductModel = require('./product.js');

CartModel.Cart.belongsToMany(ProductModel.Product, { through: CartProductModel.CartProduct });
ProductModel.Product.belongsToMany(CartModel.Cart, { through: CartProductModel.CartProduct });

async function createTables() {
    await ProductModel.Product.sync()
    await CartModel.Cart.sync()
    await CartProductModel.CartProduct.sync()
}

module.exports = {
    createTables
};
