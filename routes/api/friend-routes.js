const router = require('express').Router();
const { Friends, User } = require('../../models');

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const newFriend = await Friends.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(newFriend);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add a new friend.' });
  }
});

module.exports = router;
