const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    CartItem: sequelize.define('cartItem', {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER,
    })
}