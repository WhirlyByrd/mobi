require('dotenv').config()
const {Cart} = require('../models/cart')
const {CartItem} = require('../models/cartItem')
const {User} = require('../models/user')

module.exports = {
    getCart: async (req, res) =>{
        try {
            const {userId} = req.params
            const cart = await Cart.findAll({
                where: {userId}, include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(cart)
        } catch (error) {
            console.log('ERROR IN getCart')
            console.log(error)
            res.sendStatus(400)
        }
    },

        // how to add a product 
    addCartItem: async (req, res) => {
        try {
            const {cartItemId} = req.params

        } catch (error) {
            console.log('ERROR IN addCartItem')
            console.log(error)
            res.sendStatus(400)
        }
    },

    deleteCartItem: async (req, res) => {
        try {
            const{id} = req.params
            await CartItem.destroy({
                where: {id: +id}
            })
            
        } catch (error) {
            console.log('ERROR IN deleteCartItem')
            console.log(error)
            res.sendStatus(400)
        }
    }

    


}