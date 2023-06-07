// friend-routes.js
const router = require('express').Router();
const { User } = require('../../models');

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add a new friend.' });
  }
});

module.exports = router;
