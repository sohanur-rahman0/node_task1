const { Sequelize } = require('sequelize')

const db = new Sequelize({
  dialect: 'mysql',
  database: 'node_task',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 3306,
})



module.exports = db
