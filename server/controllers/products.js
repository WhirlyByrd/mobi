require('dotenv').config()
const {Product} = require('../models/product')
const {User} = require('../models/user')

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.findAll()
            res.status(200).send(products)
        } catch (error) {
            console.log('ERROR IN getAllProducts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getProductById: async (req, res) => {
        try {
            const product = await Product.findAll({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).send(product)
        } catch (error) {
            console.log('ERROR IN getProductById')
            console.log(error)
            res.sendStatus(400)
        }
    },

    getCurrentUserProducts: async (req, res) => {
        try {
            
            const {userId} = req.params
            const product = await Product.findAll({
                where: {userId}, include: [{
                    model: User,
                    required: true,
                    attributes: [`username`]
                }]
            })
            res.status(200).send(product)
        } catch (error) {
            console.log('ERROR IN getCurrentUserProducts')
            console.log(error)
            res.sendStatus(400)
        }
    },

    addProduct: async (req, res) => {
        try {
            const {name, desc, img, price, userId} = req.body
            await Product.create({name, desc, img, price, userId})
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR in addProduct')
            console.log(error)
            res.sendStatus(400)
        }
    },

    editProduct: async (req, res) => {
       try {
            const {id} = req.params
            const {name, desc, img, price} = req.body
            await Product.update({
                name, desc, img, price}, {
                    where: {id: +id}
                })
            res.sendStatus(200)
       } catch (error) {
            console.log('ERROR in editProduct')
            console.log(error)
            res.sendStatus(400)
       }
    },

    deleteProduct: async (req, res) => {
        try {
            const {id} = req.params
            await Product.destroy({
                where: {id: +id}
            })
            res.sendStatus(200)
        } catch (error) {
            console.log('ERROR in deleteProduct')
            console.log(error)
            res.sendStatus(400)
        }
    }
}