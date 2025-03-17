require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Fully configured CORS
const corsOptions = {
  origin: "https://ishascompetition.netlify.app", // Correct origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions)); // Apply CORS
app.options("*", cors(corsOptions)); // Handle preflight OPTIONS requests

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Import and use routes
const registrationRoutes = require("./routes/registrationRoutes");
app.use("/api/register", registrationRoutes);

// Fix Mongoose Schema Duplication Issue
mongoose.models = {};
mongoose.modelSchemas = {};

// Correct app.listen() Usage
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
