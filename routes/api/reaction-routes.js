// reaction-routes
const router = require("express").Router();
const { Thought, Reaction } = require("../../models");

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const newReaction = await Reaction.create(req.body);
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );
    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new reaction.' });
  }
});

module.exports = router;