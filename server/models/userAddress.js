const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    UserAddress: sequelize.define('userAddress', {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        addressLine1: DataTypes.STRING,
        addressLine2: DataTypes.STRING,
        city: DataTypes.STRING,
        postalCode: DataTypes.INTEGER

    })
}