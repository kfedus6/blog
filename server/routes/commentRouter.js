const Router = require('express');
const router = new Router();

const commentController = require('../controller/commentController')

router.post('/', commentController.create);
router.get('/', commentController.getComments);
router.put('/:id');
router.delete('/:id');

module.exports = router