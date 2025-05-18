require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const memeRoutes = require("./routes/memeRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase payload limit for image data

// Routes
app.use("/api/meme", memeRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/memegenerator', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});