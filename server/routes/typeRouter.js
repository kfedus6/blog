const Router = require('express');
const router = new Router();

const typeController = require('../controller/typeController');

router.post('/', typeController.create);
router.get('/', typeController.getTypes)
router.get('/:id', typeController.getType);

module.exports = router;