const product = require('./models/product.js');
const express = require('express');

const router = express.Router();

router.get('/', async function (req, res) {
    const pageSize = 10;
    const currentPage = +req.query.page || 1;
    const skip = pageSize * (currentPage - 1);

    const { rows, count } = await product.getAll(pageSize, skip);

    res.render('home.html', {
        products: rows,
        pagination: {
            totalPages: Math.ceil(count / pageSize),
            currentPage: currentPage
        }
    });
});

module.exports = router;
