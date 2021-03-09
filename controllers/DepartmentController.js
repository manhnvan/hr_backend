const Department = require('../models/Department')

module.exports = {
    async index(req, res) {
        try {
            const departments = await Department.findAll()
            return res.status(200).json({ success: true, departments: departments })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error
            })
        }
    },

    async store(req, res) {
        try {
            const department = await Department.create({ ...req.body })
            return res.status(200).json({ success: true, information: department })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error
            })
        }
    },

    async update(req, res) {
        try {
            const { departmentId } = req.params
            const updated = await Department.update({
                ...req.body
            }, {
                where: {
                    id: departmentId
                }
            })
            return res.status(200).json({
                success: true,
                information: updated
            })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async delete(req, res) {
        try {
            const departmentId = req.params
            const deleted = await Department.destroy({
                where: {
                    id: departmentId
                }
            })
            return res.status(200).json({ success: true, information: deleted })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    }
}