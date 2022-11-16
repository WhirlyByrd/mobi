require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

//object that comes from Sequelize class
const sequelize = new Sequelize(CONNECTION_STRING, 
    {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {sequelize}