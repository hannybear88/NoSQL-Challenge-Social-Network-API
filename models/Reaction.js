const {Schema, Types} = require("mongoose");
const moment = require("moment")

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
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
})

module.exports = reactionSchema;