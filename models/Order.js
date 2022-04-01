const Sequelize = require('sequelize')

const db = require('../config/db.config')

const Order = db.define('order', {
  product_id: {
    type: Sequelize.INTEGER,
  },
  total: {
    type: Sequelize.INTEGER,
  },
  stripe_id: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING(20),
  },
})

module.exports = Order
