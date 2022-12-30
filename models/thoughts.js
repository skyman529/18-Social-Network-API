const { Schema, model } = require('mongoose');
const moment = require("moment");

// Schema to create a thoughts model
const reactionSchema = new Schema(
  {
    reactionId: {},
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    userName: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        const formatDate = moment(date).format("MM/DD/YYYY");
        return formatDate;  
    },
  },    
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
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
        const formatDate = moment(date).format("MM/DD/YYYY");
        return formatDate;
  },
},
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
 {  
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  });

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});


const thoughts = model('thoughts', thoughtSchema);

module.exports = thoughts;
