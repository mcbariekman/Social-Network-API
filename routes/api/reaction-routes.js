// reaction-routes
const router = require("express").Router();
const { Thought, Reaction, User } = require("../../models");

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    const userId = req.body.userId;
    const newReaction = await Reaction.create(req.body);

    // Add the reaction to the associated thought's reactions array
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    // Add the reaction to the associated user's reactions array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );

    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new reaction.' });
  }
});

module.exports = router;
