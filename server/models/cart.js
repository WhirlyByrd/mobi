const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    Cart: sequelize.define('cart', {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        total: DataTypes.DECIMAL,
    })
}