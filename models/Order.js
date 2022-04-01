const Sequelize = require('sequelize')

const db = require('../config/db.config')

const Product = require('./Product')

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

Product.hasMany(Order, { foreignKey: 'product_id' })
Order.belongsTo(Product, { foreignKey: 'product_id' })

module.exports = Order
