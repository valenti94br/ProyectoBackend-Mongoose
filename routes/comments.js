const express = require("express")
const CommentController = require("../controllers/CommentController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()

router.post("/create",authentication, CommentController.create)
router.put("/update/:_id",authentication, CommentController.update)

module.exports = router