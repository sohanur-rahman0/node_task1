var express = require('express')
var path = require('path')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
var router = express.Router()
const db = require('../config/db.config')
const Product = require('../models/Product')
const Order = require('../models/Order')

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const products = await Product.findAll()
    const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
    // console.log(products)
    res.render('index', { products, title: 'Products', stripePublicKey })
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
    const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

    res.render('productDetails', { product, title: 'Product', stripePublicKey })
  } catch (error) {
    console.log(error)
  }
})

router.get('/thankYOu', async (req, res) => {
  try {
    const orders = await Order.findAll()

    res.render('thankYou', { title: 'Thank You', orders })
  } catch (error) {
    console.log(error)
  }
})

router.post('/payment', async (req, res) => {
  try {
    // console.log(req.body)
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: 'test name',
      address: {
        line1: 'test line1',
        city: 'test city',
        postal_code: 'test postal_code',
        state: 'test state',
        country: 'test country',
      },
    })

    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      customer: customer.id,
      description: 'test description',
    })
    // console.log(charge)
    await Order.create({
      product_id: req.body.product_id,
      total: req.body.amount,
      stripe_id: charge.id,
      status: charge.paid ? 'paid' : 'failed',
    })
    res.redirect('/thankYou')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
