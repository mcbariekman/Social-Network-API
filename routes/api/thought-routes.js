const router = require("express").Router();
const { Thought, User } = require("../../models");

// Create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    // Add the thought to the associated user's thoughts array
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new thought.' });
  }
});

// Delete a thought
router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found.' });
    }

    // Remove the thought from the associated user's thoughts array
    const user = await User.findByIdAndUpdate(
      deletedThought.userId,
      { $pull: { thoughts: deletedThought._id } },
      { new: true }
    );

    res.json({ message: 'Thought deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the thought.' });
  }
});

module.exports = router;
