const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    OrderDetail: sequelize.define('orderDetail', {
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