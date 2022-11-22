const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    Product: sequelize.define('product', {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        img: DataTypes.TEXT,
        name: DataTypes.STRING,
        desc: DataTypes.TEXT,
        price: DataTypes.DECIMAL

    })
}