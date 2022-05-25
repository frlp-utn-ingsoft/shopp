const CartModel = require('./cart.js');
const CartProductModel = require('./cartProduct.js');
const ProductModel = require('./product.js');

CartModel.Cart.belongsToMany(ProductModel.Product, {
    through: CartProductModel.CartProduct,
});

ProductModel.Product.belongsToMany(CartModel.Cart, {
    through: CartProductModel.CartProduct,
});

async function createTables(force = false) {
    await ProductModel.Product.sync({ force });
    await CartModel.Cart.sync({ force });
    await CartProductModel.CartProduct.sync({ force });
}

module.exports = {
    createTables,
    CartModel,
    ProductModel,
};
