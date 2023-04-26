
const express = require("express")
const UserController = require("../controllers/UserController")
const { authentication } = require("../middleware/authentication.js")
const router = express.Router()

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/getInfo", authentication, UserController.getInfo)
router.delete("/logout", authentication, UserController.logout)

module.exports = router 