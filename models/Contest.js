const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  teacher: { type: Types.ObjectId, required: true, ref: "Teacher" },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  students: [{ type: Types.ObjectId, ref: "User" }],
  tasks: [{ type: Object }],
  answers: [{ type: Object }],
});

module.exports = model("Contest", schema);
