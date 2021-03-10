require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8081;
const connection = require('./database/mysqlConnection')

const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// router place
const EmployeeRouter = require('./routers/EmployeeRouter')
const RoleRouter = require('./routers/RoleRouter')
const DepartmentRouter = require('./routers/DepartmentRouter')
const TaskRouter = require('./routers/TaskRouter')
const ReportRouter = require('./routers/ReportRouter')


// use router
app.use('/employees', EmployeeRouter)
app.use('/roles', RoleRouter)
app.use('/departments', DepartmentRouter)
app.use('/tasks', TaskRouter)
app.use('/reports', ReportRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});