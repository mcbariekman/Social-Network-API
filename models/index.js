const User = require('./User');
const Thought = require('./Thought');
const Reaction = require('./Reaction');
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = router;
