const express = require('express');
const router = express.Router();

const { authentication, isAuthor } = require('../middleware/authentication');

const PostController = require('../controllers/PostController');

router.post('/createPost',authentication, PostController.createPost);
router.put('/updatePost/:_id',authentication,isAuthor,PostController.updatePost)
router.delete('/deletePost/:_id', authentication, isAuthor, PostController.deletePost)
router.get('/getAll',PostController.getAllInf)
router.get('/getByTitle/:title', PostController.getByTitle)
router.get('/getById/:_id', PostController.getById)


module.exports = router;