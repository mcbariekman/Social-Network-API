const router = require("express").Router();
const { Reactions } = require("../../models");

router.post('/', async (req, res) => {
  try {
    const newReaction = await Reactions.create(req.body);
    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new reaction.' });
  }
});

module.exports = router;
