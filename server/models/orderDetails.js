const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    Post: sequelize.define('orderDetails', {
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