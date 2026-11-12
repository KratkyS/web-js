const express = require('express');
const controller = require('../controllers/postsController.js');

const router = express.Router();

router.get('/', controller.allPosts);
router.get('/:id', controller.showPost);
router.post('/', controller.addPost);
router.delete('/:id', controller.deletePost);

module.exports = router;
