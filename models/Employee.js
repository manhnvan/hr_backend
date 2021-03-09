const { Model, DataTypes } = require('sequelize')

class Employee extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role_id: DataTypes.INTEGER,
            department_id: DataTypes.INTEGER,
            hard_salary: DataTypes.FLOAT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        }, {
            sequelize,
            freezeTableName: true
        })
    }


    static associate(models) {
        this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' })
        this.belongsTo(models.Department, { foreignKey: 'department_id', as: 'department' })
    }
}

module.exports = Employee