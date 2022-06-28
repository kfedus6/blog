const jwt = require('jsonwebtoken');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const ApiError = require('../error/apiError');
const path = require('path');
const uuid = require('uuid');

class UserController {
    async registration(req, res, next) {
        const { username, email, password, admin } = req.body
        const img = req.files

        let fileName

        if (img !== undefined && img !== null) {
            fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
        }

        if (username === undefined) {
            return next(ApiError.badRequest('incorrect username'))
        } else if (email === undefined) {
            return next(ApiError.badRequest('incorrect email'))
        } else if (password === undefined) {
            return next(ApiError.badRequest('incorrect password'))
        }

        const findUserName = await User.findOne({ where: { username } })
        const findUserEmail = await User.findOne({ where: { email } })

        if (findUserName !== null) {
            return next(ApiError.badRequest('this username is not available'))
        } else if (findUserEmail !== null) {
            return next(ApiError.badRequest('this email is registered'))
        }

        const bcryptPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ username: username, email: email, password: bcryptPassword, admin: admin, iamge: fileName })

        const token = jwt.sign({ userId: user.id, username: user.username, email: user.email, admin: user, admin },
            process.env.codeSecret,
            { expiresIn: '1h' })

        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (user === null) {
            return next(ApiError.notFound('this email is not registered '))
        }

        let resPassword = bcrypt.compareSync(password, user.password)

        if (resPassword === false) {
            return next(ApiError.badRequest('incorrect password'))
        }

        const token = jwt.sign({ userId: user.id, username: user.username, email: user.email, admin: user.admin },
            process.env.codeSecret,
            { expiresIn: '1h' })

        return res.json({ token })
    }

    async auhtorization(req, res) {
        const token = jwt.sign({ userId: req.user.id, username: req.user.username, email: req.user.email, admin: req.user.admin }, process.env.codeSecret, { expiresIn: '1h' })
        return res.json({ token })
    }
};

const userController = new UserController();

module.exports = userController;