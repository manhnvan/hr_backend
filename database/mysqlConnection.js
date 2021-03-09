const Sequelize = require('sequelize')
const dbConfig = require('../config/database.config')
const Employee = require('../models/Employee')
const Role = require('../models/Role')
const Department = require('../models/Department')
const Task = require('../models/Task')
const Report = require('../models/Report')

const connection = new Sequelize(dbConfig)
Employee.init(connection)
Role.init(connection)
Department.init(connection)
Task.init(connection)
Report.init(connection)

Employee.associate(connection.models)
Department.associate(connection.models)
Task.associate(connection.models)
Report.associate(connection.models)

try {
    connection.authenticate()
    console.log('connected to database')
} catch (error) {
    console.log('fail to connect database:', error)
}

module.exports = connection