const Task = require('../models/Task')

module.exports = {
    async index(req, res) {
        try {
            const tasks = await Task.findAll()
            return res.status(200).json({ success: true, tasks: tasks })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async store(req, res) {
        try {
            const task = await Task.create({ ...req.body })
            return res.status(200).json({ success: true, information: task })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async update(req, res) {
        try {
            const { taskId } = req.params
            const updated = await Task.update({
                ...req.body
            }, {
                where: {
                    id: taskId
                }
            })
            return res.status(200).json({ success: true, information: updated })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async delete(req, res) {
        try {
            const { taskId } = req.params
            const deleted = await Task.destroy({
                where: {
                    id: taskId
                }
            })
            return res.status(200).json({ success: true, information: deleted })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    }
}