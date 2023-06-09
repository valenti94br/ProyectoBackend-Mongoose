const Comment = require('../models/Comment');
const Post = require('../models/Post')

const CommentController = {
    async create(req, res) {
        try {
            const comment = await Comment.create({...req.body, userId : req.user._id, postId : req.body._id})
            await Post.findByIdAndUpdate(req.body.postId, {$push:{ comments : comment._id}})
            res.status(201).send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al crear el comment' })
        }
    },
    async update(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(
                req.params._id, req.body,
                {new: true})
                res.status(201).send(comment)
            
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al actualizar el comment' })
        }
    }
}

module.exports = CommentController;