const { Schema, model } = require('mongoose');
const User = require('./models/user');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Middleware function to remove associated thoughts when a user is deleted
userSchema.pre('remove', async function (next) {
  const Thought = model('Thought');
  try {
    await Thought.deleteMany({ username: this.username });
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
