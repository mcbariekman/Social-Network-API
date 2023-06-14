// index.js
const router = require('express').Router();
const friendRoutes = require('./friend-routes');
const reactionRoutes = require('./reaction-routes');
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/friends', friendRoutes);
router.use('/reactions', reactionRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
