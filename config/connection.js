const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Thoughts = require('../models/Thoughts');
const Reactions = require('../models/Reactions');
const Friends = require('../models/Friends');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(express.json());

// Users Routes
app.post('/api/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new user.' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the user.' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the user.' });
  }
});

// Thoughts Routes
app.post('/api/thoughts', async (req, res) => {
  try {
    const newThought = await Thoughts.create(req.body);
    res.json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new thought.' });
  }
});

app.put('/api/thoughts/:id', async (req, res) => {
  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the thought.' });
  }
});

app.delete('/api/thoughts/:id', async (req, res) => {
  try {
    await Thoughts.findByIdAndDelete(req.params.id);
    res.json({ message: 'Thought deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete the thought.' });
  }
});

// Reactions Routes
app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const newReaction = await Reactions.create(req.body);
    const thought = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );
    res.json(newReaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add a new reaction.' });
  }
});

app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );
    await Reactions.findByIdAndDelete(req.params.reactionId);
    res.json({ message: 'Reaction removed successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove the reaction.' });
  }
});

// Friends Routes
app.post('/api/users/:userId/friends', async (req, res) => {
  try {
    const newFriend = await Friends.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: newFriend._id } },
      { new: true }
    );
    res.json(newFriend);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add a new friend.' });
  }
});

app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    await Friends.findByIdAndDelete(req.params.friendId);
    res.json({ message: 'Friend removed successfully.' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to remove the friend.' });
  }
});

module.exports = mongoose.connection;
