const { CartModel, ProductModel } = require('./models/index.js');
const express = require('express');

const router = express.Router();

router.get('/', async function (req, res) {
    const pageSize = 10;
    const currentPage = +req.query.page || 1;
    const skip = pageSize * (currentPage - 1);

    const { rows, count } = await ProductModel.getAll(pageSize, skip);

    res.render('home.html', {
        products: rows,
        pagination: {
            totalPages: Math.ceil(count / pageSize),
            currentPage: currentPage,
        },
    });
});

router.post('/cart', async function (req, res) {
    const productID = +req.body.productid;
    const product = await ProductModel.findById(productID);

    if (product != null) {
        await CartModel.addProductToCart(1, product);
    }

    res.redirect('/cart');
});

router.post('/remove', async function (req, res) {
    const productID = +req.body.productid;
    const product = await ProductModel.findById(productID);

    if (product != null) {
        await CartModel.removeProductFromCart(1, productID);
    }

    res.redirect('/cart');
})



router.get('/cart', async function (req, res) {
    const cart = await CartModel.findById(1);
    const products = await cart.getProducts();

    res.render('cart.html', {
        products,
        cart,
    });
});

module.exports = router;
