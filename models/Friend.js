const { Schema, model } = require('mongoose');

const friendsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  friendId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Friend = model('Friend', friendsSchema);

module.exports = Friend;
