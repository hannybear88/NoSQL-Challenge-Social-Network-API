const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment")

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
          // return moment(date).format("MM/DD/YYYY")
          // return moment (date).format ("MMM Do, YYYY [at] hh:mm a");
          return moment (date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    }
});

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model("Thought", thoughtSchema)

module.exports =  Thought;
