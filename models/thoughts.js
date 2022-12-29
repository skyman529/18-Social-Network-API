const { Schema, model } = require('mongoose');

// Schema to create a thoughts model
const reactionSchema = new Schema(
  {
    reactionId: {},
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 250,
    },
    userName: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => formatDate(time)
    },
  },    
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
const thoughtSchema = new Schema(
  {
    thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 250,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
  },
  reactions: [reactionSchema],
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


const thoughts = model('thoughts', thoughtSchema);

module.exports = thoughts;
