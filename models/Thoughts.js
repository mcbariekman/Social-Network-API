const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Reactions"
    }
  ]
});

const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts;
