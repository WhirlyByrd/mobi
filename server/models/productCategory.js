const {sequelize} = require('../util/database')
const {DataTypes} = require('sequelize')

module.exports = {
    ProductCategory: sequelize.define('productCategory', {
        id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        desc: DataTypes.TEXT
    })
}