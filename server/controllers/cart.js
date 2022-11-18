require('dotenv').config()
const {Cart} = require('../models/cart')
const {User} = require('../models/user')
const {Product} = require('../models/product')

module.exports = {

    //CREATE
    newItem: async (req, res) => {
        try {
            const {userId, productId, quantity} = req.body
            Cart.create({userId, productId, quantity})
            
            res.sendStatus(200)
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
            const cart = await Cart.findOne({
                where: {userId}, include: [{
                    model: Product,
                    required: true,
                    attributes: [`name`, `desc`, `img`, `price`]
                }]
            })
            res.status(200).send(cart)
        } catch (error) {
            console.log('ERROR IN getCart')
            console.log(error)
            res.sendStatus(400)
        }
    },

   

    


}