const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    Post: sequelize.define('payment_details', {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        amount: DataTypes.INTEGER,
        provider: DataTypes.STRING,
        status: DataTypes.STRING
    })
}