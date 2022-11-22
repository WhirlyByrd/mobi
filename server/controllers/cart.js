require('dotenv').config()
const {Cart} = require('../models/cart')
const {User} = require('../models/user')
const {Product} = require('../models/product')

const {sequelize} = require('../util/database')

module.exports = {

    //CREATE
    addToCart: async (req, res) => {
        try {
            const {userId, productId, quantity} = req.body
            console.log(productId)
            let product = await Cart.create({userId, productId, quantity:1})
            
            console.log(product)
            res.status(200).send(product)
        } catch (error) {
            console.log('ERROR IN Cart')
            console.log(error)
            res.sendStatus(400)
        }
    },

    //UPDATE
    editCart: async (req, res) => {
        try {
            const updatedCart = await Cart.update(
                {
                    where: {id: +req.params.cartId}
                },
                {
                    quanity: req.body.quantity
                }
            )
            res.status(200).send(updatedCart)
        } catch (error) {
            console.log('ERROR IN editCart')
            console.log(error)
            res.sendStatus(400)
        }
    },

    //DELETE
    deleteCartItem: async (req, res) => {
        try {
            const {cartId} = req.params
            await Cart.destroy({
                where: {id: +cartId}
            })
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR IN deleteCart')
            console.log(error)
            res.sendStatus(400)
        }
    },

    //GET USER CART
    getCart: async (req, res) =>{
        try {
            const {userId} = req.params
            // const cart = await Cart.findAll({
            //     where: {userId}, include: [{
            //         model: Product,
            //         required: true,
            //         attributes: [`img`,`name`, `price`, `desc`]
            //     }]
            // })
            const cart = await sequelize.query(`
            SELECT "cart"."id", "cart"."quantity", "cart"."createdAt", "cart"."updatedAt", "cart"."userId", "products"."id", "products"."img" , "products"."name", "products"."price", "products"."desc"  FROM "carts" AS "cart" LEFT OUTER JOIN "products" AS "products" ON "cart"."productId" = "products"."id" WHERE "cart"."userId" = '${userId}';
            `)
            console.log('get cart', cart[0])
            res.status(200).send(cart[0])
        } catch (error) {
            console.log('ERROR IN getCart')
            console.log(error)
            res.sendStatus(400)
        }
    
            
    },

   

    


}