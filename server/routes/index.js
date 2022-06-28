const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const typeRouter = require('./typeRouter');
const commentRouter = require('./commentRouter');

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/type', typeRouter);
router.use('/comment', commentRouter);

module.exports = router;