const router = require('express').Router()

const TaskController = require('../controllers/TaskController')


router.get('/', TaskController.index)

router.post('/', TaskController.store)

router.put('/:taskId', TaskController.update)

router.delete('/:taskId', TaskController.delete)

module.exports = router