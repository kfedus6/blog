const Router = require('express');
const router = new Router();

const postController = require('../controller/postController');

router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.put('/:id', postController.putPost);
router.delete('/:id', postController.deletePost);


module.exports = router;