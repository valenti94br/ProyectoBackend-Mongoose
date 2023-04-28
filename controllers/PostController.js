const Post = require("../models/Post");
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const PostController = {

  async createPost(req, res) {
    try {
      const post = await Post.create({ ...req.body, userId: req.user._id })//el userId se poneautomaticamente el del usuarioque esta conectado
      res.status(201).send({ message: 'Post creado correctamente', post })
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
  async getAllInf(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const posts = await Post.find()
        .populate('userId')
        .populate({
          path: 'comments',
          populate: {
            path: 'userId'
          }
        })
        .limit(limit)
        .skip((page - 1) * limit);
      res.status(201).send({ message: 'Mostrando informacion correctamente', posts });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar coger la informacion",
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
      const post = await Post.findById(req.params._id).populate("comments")
      res.send({ message: 'Post por id encontrado con exito', post })
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar coger la informacion",
      })
    }
  },
  async like(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id);
      if (post.likes.includes(req.user._id)) {
        return res.status(400).send('Hay un problema con tu like');
      }
      post.likes.push(req.user._id)
      await post.save();
      res.status(201).send({ msg: 'Te gusta este post!', post })
    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  },
  async unlike(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id);
      if (post.likes.includes(req.user._id)) {
        post.likes.pull(req.user._id);
        await post.save();
        return res.status(200).send({ msg: 'Has quitado tu like!', post })
      } else {
        return res.status(400).send('Hay un problema')
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  }
}


module.exports = PostController;
