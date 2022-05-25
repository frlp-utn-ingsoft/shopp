const product = require('./models/product.js');
const express = require('express');

const router = express.Router();

router.get('/', async function (req, res) {
    const { rows, } = await product.getAll();

    res.render('home.html', {
        products: rows
    });
});

module.exports = router;
