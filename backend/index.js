const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Data, Count } = require("./models.js");

// Connect to MongoDB
mongoose.connect('mongodb://localhost/your-database-name');


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});