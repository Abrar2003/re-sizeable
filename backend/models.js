const mongoose = require("mongoose");
// Data schema
const dataSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Data = mongoose.model("Data", dataSchema);

// Count schema
const countSchema = new mongoose.Schema({
  addCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 },
});

const Count = mongoose.model("Count", countSchema);

module.exports = {Data, Count}