const products = require('./products.json');
const Models = require('../src/models/index.js');

async function insertIntoDB() {
    await Models.createTables(true);
    await Models.CartModel.create();

    return Models.ProductModel.Product.bulkCreate(products);
}

if (require.main === module) {
    insertIntoDB();
}

module.exports = {
    insertIntoDB,
};
