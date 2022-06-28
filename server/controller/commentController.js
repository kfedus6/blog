const { Comment } = require('../models/models');
const ApiError = require('../error/apiError');


class CommentController {
    async create(req, res, next) {
        const { content, userId, postId } = req.body

        if (content === undefined) {
            return next(ApiError.badRequest('incorrect content'))
        } else if (userId === undefined) {
            return next(ApiError.badRequest('incorrect user id'))
        } else if (postId === undefined) {
            return next(ApiError.badRequest('incorrect post id'))
        }

        const comment = await Comment.create({ content: content, userId: userId, postId: postId })

        return res.json(comment)
    }

    async getComments(req, res, next) {
        let { postId, limit, page } = req.body

        if (limit == undefined) {
            limit = 10
        }

        if (page == undefined) {
            page = 1
        }

        let offset = page * limit - limit

        if (postId === undefined) {
            return next(ApiError.badRequest('postId undefined'))
        }

        const comments = await Comment.findAndCountAll({ where: { postId: postId } }, { limit: Number(limit), offset: Number(offset) })

        return res.json(comments)
    }
};

const commentController = new CommentController();

module.exports = commentController;