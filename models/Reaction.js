const { Schema, model } = require('mongoose');

const reactionsSchema = new Schema({
  reactionBody: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  thoughtId: {
    type: Schema.Types.ObjectId,
    ref: "Thought",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reaction = model('Reaction', reactionsSchema);

module.exports = Reaction;
