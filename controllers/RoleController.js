const Role = require('../models/Role')
const jwt = require('jsonwebtoken')

module.exports = {
    async index(req, res) {
        try {
            const roles = await Role.findAll()
            return res.status(200).json({ success: true, roles: roles })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },

    async checkRoleFromToken(req, res) {
        try {
            const { authorization } = req.headers
            if (!authorization) {
                return res.status(200).json({
                    auth: false,
                })
            }
            const token = authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
            return res.status(200).json({
                auth: true,
                role: decoded.dataValues.role_id
            })
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                auth: false,
            })
        }

    },

    async store(req, res) {
        try {
            const role = await Role.create({ ...req.body })
            return res.status(200).json({ success: true, information: role })
        } catch (error) {
            return res.status(400).json({ success: false, error: error })
        }
    },
    async update(req, res) {
        try {
            const updateInformation = req.body
            const { roleId } = req.params
            const updated = await Role.update({
                ...updateInformation
            }, {
                where: {
                    id: roleId
                }
            })
            return res.status(200).json({
                success: true,
                information: updated
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error
            })
        }
    },
    async delete(req, res) {
        try {
            const roleId = req.params
            const deleted = await Role.destroy({
                where: {
                    id: roleId
                }
            })
            return res.status(200).json({ success: true, information: deleted })
        } catch (error) {
            return res.status(200).json({ success: false, error: error })
        }
    }
}