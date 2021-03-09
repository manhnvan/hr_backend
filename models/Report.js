const { Model, DataTypes } = require('sequelize')

class Report extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            reporter: DataTypes.INTEGER,
            task_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            detail: DataTypes.STRING,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models) {
        this.hasOne(models.Task, { foreignKey: 'id', as: 'task' })
    }
}

module.exports = Report