const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    UserPayment: sequelize.define('userPayment',
    {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        paymentType: DataTypes.STRING,
        provider: DataTypes.STRING,
        accountNumber: DataTypes.INTEGER,
        expDATE: DataTypes.DATE
    })
}