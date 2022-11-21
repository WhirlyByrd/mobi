//backend uses require keyword
require('dotenv').config()
const express = require('express');
const cors = require('cors');

//const imageupload = require('express-fileupload')




const {SERVER_PORT} = process.env
const {sequelize} = require('./util/database')

const {User} = require('./models/user')
const {Cart} = require('./models/cart')
const {Product} = require('./models/product')
const {UserAddress} = require('./models/userAddress')


const {register, login} = require('./controllers/authCtrl')
const {getAllProducts, getProductById, getCurrentUserProducts, addProduct, editProduct, deleteProduct} = require('./controllers/products')
const {isAuthenticated} = require('./middleware/isAuthenticated')

//for cart items
const {addToCart, getCart, editCart, deleteCartItem} = require('./controllers/cart')

const app = express()

app.use(express.json())
app.use(cors())
// app.use(
//     fileupload({
//         createdParentPath: true,
//     })
// )
// app.use(express.urlencoded({ extended: true}));

User.hasMany(Product)
Product.belongsTo(User)

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasOne(UserAddress)
UserAddress.belongsTo(User)

Cart.hasMany(Product)
Product.belongsTo(Cart)

Product.hasMany(Cart)

// User.hasMany(Product).hasOne(Cart)
// Cart.belongsTo(User).hasMany(Product)
// Product.belongsTo(User).hasMany(Cart)














//Endpoints

//Auth
app.post('/register', register)
app.post('/login', login)

//get products without authentication
app.get('/products', getAllProducts)
app.get('/products/:id', getProductById)

//CRUD Users products
app.get('/userproducts/:userId', isAuthenticated, getCurrentUserProducts)
app.post('/products', isAuthenticated, addProduct)
app.put('/products/:id', isAuthenticated, editProduct)
app.delete('/products/:id', isAuthenticated, deleteProduct)

//endpoints for cart 
app.post('/carts/item', isAuthenticated, addToCart)
app.get('/carts/:userId',isAuthenticated, getCart)
app.put('/carts/:cartId', isAuthenticated, editCart)
app.delete('/carts/:cartId', isAuthenticated, deleteCartItem)





//remove force: true when done building {force:true}
sequelize.sync()
.then(() => {
    app.listen(SERVER_PORT, console.log(`Listening to server port ${SERVER_PORT}`));

})
.catch(err => console.log(err))