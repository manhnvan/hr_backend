const router = require('express').Router()
const EmployeeController = require('../controllers/EmployeeController')

router.get('/', EmployeeController.index)

router.post('/', EmployeeController.store)

router.put('/:employeeId', EmployeeController.update)

router.delete('/:employeeId', EmployeeController.delete)

router.post('/login', EmployeeController.signIn)

module.exports = router