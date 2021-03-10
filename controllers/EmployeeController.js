const Employee = require('../models/Employee')
const Role = require('../models/Role')
const Department = require('../models/Department')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

module.exports = {
    async index(req, res) {
        try {
            const employees = await Employee.findAll({
                include: [
                    { model: Role, as: 'role' },
                    { model: Department, as: 'department' }
                ]
            });
            if (employees == '' || employees == null) {
                return res.status(200).json({ employees: [] })
            }
            return res.status(200).json({ employees: employees })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error })
        }
    },

    async signIn(req, res) {
        let { email, password, captcha } = req.body
        captcha = parseInt(captcha)
        const employee = await Employee.findOne({
            where: {
                email: email
            }
        })
        let isInvalidAccount = false;
        let loginFailCause = ""
        if (!employee) {
            isInvalidAccount = true
            loginFailCause = "Email does not exist"
            return res.status(400).json({
                success: false,
                message: loginFailCause,
                login_failed_count: 0,
                captcha: 0
            })
        }
        const validPassword = await bcrypt.compare(password, employee.password);
        if (!validPassword) {
            isInvalidAccount = true
            loginFailCause = "Invalid password"
        }
        if (employee.login_failed_count >= 5) {
            if (captcha !== employee.captcha) {
                isInvalidAccount = true
                loginFailCause = "Invalid captcha"
            }
        }
        if (isInvalidAccount) {
            employee.login_failed_count++
            if (employee.login_failed_count >= 5) {
                employee.captcha = Math.floor(1000 + Math.random() * 9000);
            }
            await employee.save()
            return res.status(400).json({
                success: false,
                message: loginFailCause,
                login_failed_count: employee.login_failed_count,
                captcha: employee.captcha
            })
        }
        const token = jwt.sign({ ...employee }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
        employee.login_failed_count = 0
        await employee.save()
        return res.status(200).json({
            success: true,
            user: employee,
            token: token
        })
    },

    async store(req, res) {
        try {
            console.log(req.body)
            let {
                first_name,
                last_name,
                phone_number,
                email,
                role_id,
                department_id,
                hard_salary,
                password
            } = req.body
            password = await bcrypt.hash(req.body.password, saltRounds);
            const employee = await Employee.create({
                first_name,
                last_name,
                phone_number,
                email,
                role_id,
                department_id,
                hard_salary,
                password
            });
            return res.status(200).json({
                success: true,
                information: employee
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                success: false,
                error: error
            })
        }
    },

    async update(req, res) {
        const updateInformation = req.body
        const { employeeId } = req.params
        try {
            const updated = await Employee.update({
                ...updateInformation
            }, {
                where: {
                    id: employeeId
                }
            })
            res.status(200).json({
                success: true,
                information: updated
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error
            })
        }

    },

    async delete(req, res) {
        const { employeeId } = req.params
        try {
            const deleted = await Employee.destroy({
                where: {
                    id: employeeId
                }
            })
            return res.status(200).json({
                success: true,
                information: deleted
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error
            })
        }
    }
}