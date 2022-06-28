const { TypePost } = require('../models/models');
const ApiError = require('../error/apiError');

class TypeController {
    async create(req, res, next) {
        const { type } = req.body

        if (type === undefined) {
            return next(ApiError.badRequest('incorrect type'))
        }

        const typePost = await TypePost.create({ type: type })

        return res.json(typePost)
    }

    async getTypes(req, res) {
        const types = await TypePost.findAll()

        return res.json(types)
    }

    async getType(req, res) {
        const { id } = req.params

        const type = await TypePost.findOne({ where: { id } })

        return res.json(type)
    }
};

const typeController = new TypeController();

module.exports = typeController;