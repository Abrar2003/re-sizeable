const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const { Data, Count } = require("./models.js");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.get("/api/data", async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  }  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.post("/api/data", async (req, res) => {
  try {
    const newData = new Data({ text: req.body.text });
    const savedData = await newData.save();

    // Increment the add count
    await Count.findOneAndUpdate(
      {},
      { $inc: { addCount: 1 } },
      { new: true, upsert: true }
    );

    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/data/:id", async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(
      req.params.id,
      { $set: { text: req.body.text, updatedAt: Date.now() } },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Increment the update count
    await Count.findOneAndUpdate(
      {},
      { $inc: { updateCount: 1 } },
      { new: true, upsert: true }
    );

    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/count", async (req, res) => {
  try {
    const count = await Count.findOne({});
    res.json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to MongoDB");
  });

  console.log(`Server is running on port ${PORT}`);
});
