const express = require('express');
const router = express.Router();

const { authentication, isAuthor } = require('../middleware/authentication');

const PostController = require('../controllers/PostController');

router.post('/createPost',authentication, PostController.createPost);
router.put('/updatePost/:_id',authentication,isAuthor,PostController.updatePost)

module.exports = router;