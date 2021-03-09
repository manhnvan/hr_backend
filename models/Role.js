const { Model, DataTypes } = require('sequelize')

class Role extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            min_salary: {
                type: DataTypes.FLOAT,
            },
        }, {
            sequelize,
            freezeTableName: true
        })
    }
}

module.exports = Role