const router = require('express').Router()
const ReportController = require('../controllers/ReportController')

router.get('/', ReportController.index)

router.post('/', ReportController.store)

router.put('/:reportId', ReportController.update)

router.delete('/:reportId', ReportController.delete)

module.exports = router