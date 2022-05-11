const CartModel = require('./cart.js');
const CartProductModel = require('./cartProduct.js');
const ProductModel = require('./product.js');

async function createTables() {
    ProductModel.Product.sync()
    CartModel.Cart.sync()
    CartProductModel.CartProduct.sync()
}

module.exports = {
    createTables
};
