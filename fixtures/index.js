const products = require('./products.json');
const { Product } = require('../src/models/product.js');

async function insertIntoDB() {
    await Product.sync({ force: true });
    return Product.bulkCreate(products);
}

if (require.main === module) {
    insertIntoDB();
}

module.exports = {
    insertIntoDB,
};
