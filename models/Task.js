const { Model, DataTypes } = require('sequelize')

class Task extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            start: DataTypes.DATE,
            end: DataTypes.DATE,
            current_employee: DataTypes.INTEGER,
            title: DataTypes.STRING,
            detail: DataTypes.STRING,
            status: DataTypes.ENUM(['available', 'completed', 'uncompleted', 'pending'])
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models) {
        this.hasOne(models.Employee, { foreignKey: 'id', as: 'employee' })
    }

}

module.exports = Task