const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (token === undefined) {
        return next(ApiError.authorization('not found'))
    }
    req.user = jwt.verify(token, process.env.codeSecret)
    next()
};