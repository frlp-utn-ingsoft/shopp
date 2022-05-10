const path = require('path');
const Sequelize = require('sequelize');
const env = require('./utils/env.js');

const inTest = env.test;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: inTest ? false : console.log,
    storage: inTest
        ? ':memory:'
        : path.join(__dirname, '..', 'src/database.sqlite'),
});

module.exports = sequelize;
