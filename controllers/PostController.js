const Post = require("../models/Post");
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const PostController = {

  async createPost(req, res) {
    try {
      const post = await Post.create({...req.body,userId:req.user._id})
      res.status(201).send({message:'Post creado correctamente',post})
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Ha habido un problema al crear el post' })
    }
  },
  async updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );
      res.send({ message: "Post actualizado correctamente", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al actualizar el post' })
    }
  }


}



module.exports = PostController;
