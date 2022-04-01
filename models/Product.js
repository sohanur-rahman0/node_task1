const Sequelize = require('sequelize')

const db = require('../config/db.config')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Product
