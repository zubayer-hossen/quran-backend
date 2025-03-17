require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Fully configured CORS
const corsOptions = {
  origin: "https://ishascompetition.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Import and use routes
const registrationRoutes = require("./routes/registrationRoutes");
app.use("/api/register", registrationRoutes);

// Fix Mongoose Schema Duplication Issue
mongoose.models = {};
mongoose.modelSchemas = {};

// ✅ Add a Home Route to Check Server
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

// Correct app.listen() Usage
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
