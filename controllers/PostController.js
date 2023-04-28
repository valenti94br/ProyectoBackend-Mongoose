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
  },
  async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ message: "Post eliminado correctamente", post });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al eliminar el post",
      });
    }
  },
  async getByTitle(req, res) {
    try {
      if (req.params.title.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const title = new RegExp(req.params.title, "i");//la i significa que va a ser insensible de may y min
      const post = await Post.find({ title });
      res.send({ message: "Post encontrado con exito", post })

    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al buscar la informacion",
      })
    }
  },
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id)
      res.send({ message: 'Post por id encontrado con exito', post })
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar coger la informacion",
      })
    }
  },

}



module.exports = PostController;
