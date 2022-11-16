const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    ProductInventory: sequelize.define('productInventory', {
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