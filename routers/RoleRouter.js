const router = require('express').Router()

const RoleController = require('../controllers/RoleController')

router.get('/roleFromToken', RoleController.checkRoleFromToken)

router.get('/', RoleController.index)

router.post('/', RoleController.store)

router.put('/:roleId', RoleController.update)

router.delete('/:roleId', RoleController.delete)

module.exports = router