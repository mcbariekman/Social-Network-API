// reaction-routes
const router = require("express").Router();
const { Thought, Reaction } = require("../../models");

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const newReaction = await Reaction.create(req.body);
       // Add reaction to thoughts
       const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new reaction.' });
  }
});

module.exports = router;