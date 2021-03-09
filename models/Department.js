const { Model, DataTypes } = require('sequelize')

class Department extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            location: DataTypes.STRING,
            manager_id: DataTypes.INTEGER,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models) {
        this.hasOne(models.Employee, { foreignKey: 'id', as: 'manager' })
    }
}

module.exports = Department