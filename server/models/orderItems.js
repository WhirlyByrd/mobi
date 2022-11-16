const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    Post: sequelize.define('orderItems', {
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