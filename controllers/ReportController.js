const Report = require('../models/Report')

module.exports = {
    async index(req, res) {
        try {
            const reports = await Report.findAll()
            return res.status(200).json({ success: true, reports: reports })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async store(req, res) {
        try {
            const report = await Report.create({
                ...req.body
            })
            return res.status(200).json({ success: true, information: report })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async update(req, res) {
        try {
            const { reportId } = req.params
            const updated = await Report.update({
                ...req.body
            }, {
                where: {
                    id: reportId
                }
            })
            return res.status(200).json({ success: true, information: updated })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async delete(req, res) {
        const { reportId } = req.params
        try {
            const deleted = await Report.destroy({
                ...req.body
            }, {
                where: {
                    id: reportId
                }
            })
            return res.status(200).json({ success: true, information: deleted })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    }
}