const { Post, TypePost } = require('../models/models');
const ApiError = require('../error/apiError');
const uuid = require('uuid');
const path = require('path');

class PostController {
    async createPost(req, res, next) {
        const { title, content, userId, typePostId } = req.body

        const { img } = req.files

        let fileName = uuid.v4() + 'jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        if (title === undefined) {
            return next(ApiError.badRequest('incorrect title'))
        } else if (content === undefined) {
            return next(ApiError.badRequest('incorrect content'))
        }

        const post = await Post.create({ title: title, content: content, userId: userId, typePostId: typePostId, image: fileName })

        return res.json(post)
    }

    async getPosts(req, res) {
        let { typePostId, limit, page } = req.body

        if (limit === undefined) {
            limit = 10
        }

        if (page === undefined) {
            page = 1
        }

        let offset = page * limit - limit
        let posts

        if (typePostId === undefined) {
            posts = await Post.findAndCountAll({ limit: Number(limit), offset: Number(offset) })
        } else {
            posts = await Post.findAndCountAll({ where: { typePostId: typePostId } }, { limit: Number(limit), offset: Number(offset) })
        }

        return res.json(posts)
    }

    async getPost(req, res, next) {
        const { id } = req.params

        const postId = await Post.findOne({ where: { id } })
        let post

        if (postId === null) {
            return next(ApiError.badRequest(`there is not post with this ${id}`))
        } else {
            post = await Post.findOne({ where: { id } })
        }

        return res.json(post)
    }

    async putPost(req, res) {
        const { title, content, like, dislike } = req.body
        const { id } = req.params

        const post = await Post.findOne({ where: { id } })
        let newLike
        let newDislike

        if (like !== undefined) {
            newLike = +post.like + +like
        }

        if (dislike !== undefined) {
            newDislike = +post.dislike + +dislike
        }

        let updatePost

        if (title !== undefined && content === undefined && like === undefined && dislike === undefined) {
            updatePost = await Post.update({ title: title }, { where: { id: id } })
        } else if (content !== undefined && title === undefined && like === undefined && dislike === undefined) {
            updatePost = await Post.update({ content: content }, { where: { id: id } })
        } else if (content !== undefined && title !== undefined && like === undefined && dislike === undefined) {
            updatePost = await Post.update({ content: content, title: title }, { where: { id: id } })
        } else if (content === undefined && title === undefined && like !== undefined && dislike === undefined) {
            updatePost = await Post.update({ like: newLike }, { where: { id: id } })
        } else if (content === undefined && title === undefined && like === undefined && dislike !== undefined) {
            updatePost = await Post.update({ dislike: newDislike }, { where: { id: id } })
        }

        return res.json(updatePost)
    }

    async deletePost(req, res) {
        const { id } = req.params

        const post = await Post.destroy({ where: { id } })

        return res.json(post)
    }
};

const postController = new PostController();

module.exports = postController;