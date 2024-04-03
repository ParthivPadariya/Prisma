const express = require('express');
const { createPost, updatePost, deletePost, getAllPost } = require('../controller/postController');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');

router.route('/post/create').post(isLoggedIn, createPost);
router.route('/post/update/:id').put(isLoggedIn, updatePost);
router.route('/post/delete/:id').delete(isLoggedIn, deletePost);
router.route('/post/get').get( getAllPost);


module.exports = router;