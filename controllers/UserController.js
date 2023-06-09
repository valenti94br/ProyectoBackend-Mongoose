
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const UserController = {

    async register(req, res, next) { //next para hacer uso del middleware errors
        try {
            const user = await User.create(req.body);
            res.status(201).send({ message: "Usuario registrado con exito", user });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: "Bienvenid@ " + user.name, token });
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async getInfo(req, res) {
        try {
            const user = req.user;
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Ha habido un problema al obtener la información del usuario",
            });
        }
    },

    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.send({ message: "Desconectado con éxito" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "Hubo un problema al intentar desconectar al usuario",
            });
        }
    }

};

module.exports = UserController;


