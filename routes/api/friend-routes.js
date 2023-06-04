const router = require('express').Router();
const { User, Friends } = require('../../models');

router.post('/friends', async (req, res) => {
  try {
    // Access the `Friends` model and create a new friend
    const newFriend = await Friends.create(req.body);
    res.json(newFriend);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new friend.' });
  }
});

module.exports = router;
