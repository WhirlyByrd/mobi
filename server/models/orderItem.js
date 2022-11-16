const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    OrderItem: sequelize.define('orderItems', {
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