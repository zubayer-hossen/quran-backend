require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Fully configured CORS
const corsOptions = {
  origin: "https://ishascompetition.netlify.app", // Correct origin without trailing slash
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions)); // Apply CORS

// Handle preflight OPTIONS request
app.options("*", cors(corsOptions)); // Handle OPTIONS requests for all routes

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const registrationRoutes = require("./routes/registrationRoutes");
app.use("/api/register", registrationRoutes);

app.listen("https://quran-backend-b49d.onrender.com", () => console.log("Server running on render"));
