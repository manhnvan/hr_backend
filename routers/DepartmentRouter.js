const router = require('express').Router()
const DepartmentController = require('../controllers/DepartmentController')

router.get('/', DepartmentController.index)

router.post('/', DepartmentController.store)

router.put('/:departmentId', DepartmentController.update)

router.delete('/:departmentId', DepartmentController.delete)

module.exports = router