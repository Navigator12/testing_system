const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: "User" },
  contestId: { type: Types.ObjectId, required: true, ref: "Contest" },
  correct: { type: Number, required: true },
  estimation: { type: Number, required: true },
});

module.exports = model("Mark", schema);
