var express = require('express')
var path = require('path')
var router = express.Router()
const db = require('../config/db.config')
const Product = require('../models/Product')

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const products = await Product.findAll()
    // console.log(products)
    res.render('index', { products, title: 'Products' })
  } catch (error) {
    console.log(error)
  }
})

router.get('/addProduct', async (req, res) => {
  try {
    res.render('addProduct', { title: 'Add Product' })
  } catch (error) {
    console.log(error)
  }
})

router.post('/addProduct', async (req, res) => {
  try {
    console.log(req.body)
    if (!req.files || Object.keys(req.files).length === 0) {
      res.redirect('/addProduct')
    }

    const image = req.files.image
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', image.name)

    await image.mv(uploadPath)

    const { title, description, price } = req.body
    await Product.create({
      title,
      description,
      image: image.name,
      price,
    })
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.render('productDetails', { product, title: 'Product' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
