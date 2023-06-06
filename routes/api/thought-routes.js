const router = require("express").Router();
const { Thoughts } = require("../../models");

router.post('/', async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    res.json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new thought.' });
  }
});

module.exports = router;
