const { Schema, model } = require('mongoose');
const moment = require("moment");
const reactionSchema = require("./reaction");

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
  name: {
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


const thought = model('thought', thoughtSchema);

module.exports = thought;
