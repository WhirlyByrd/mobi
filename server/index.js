//backend uses require keyword
require('dotenv').config()
const express = require('express');
const cors = require('cors');


const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')

const {User} = require('./models/user')
const {Cart} = require('./models/cart')
const {CartItem} = require('./models/cartItem')
const {OrderDetail} = require('./models/orderDetail')
const {OrderItem} = require('./models/orderItem')
const {PaymentDetail} = require('./models/paymentDetail')
const {Product} = require('./models/product')
const {ProductCategory} = require('./models/productCategory')
const {ProductInventory} = require('./models/productInventory')
const {UserAddress} = require('./models/userAddress')
const {UserPayment} = require('./models/userPayment')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(Product)
Product.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasOne(UserPayment)
UserPayment.belongsTo(User)

User.hasOne(UserAddress)
UserAddress.belongsTo(User)

User.hasMany(OrderDetail)
OrderDetail.belongsTo(User)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

ProductCategory.hasMany(Product)
Product.belongsTo(ProductCategory)

ProductInventory.hasMany(Product)
Product.belongsTo(ProductInventory)

Product.hasMany(CartItem)
CartItem.belongsTo(Product)

Product.hasMany(OrderItem)
OrderItem.belongsTo(Product)

OrderDetail.hasMany(OrderItem)
OrderItem.belongsTo(OrderDetail)

PaymentDetail.hasOne(OrderDetail)
OrderDetail.belongsTo(PaymentDetail)







//remove force: true when done building
sequelize.sync({ force: true })
.then(() => {
    app.listen(SERVER_PORT, console.log(`Listening to server port ${SERVER_PORT}`));

})
.catch(err => console.log(err))