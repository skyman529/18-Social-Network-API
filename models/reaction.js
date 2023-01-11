const moment = require("moment");
const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),

    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    name: {
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
},
  {
  toJSON: {
    getters: true,
  },
    id: false,
  }

);

module.exports = reactionSchema;