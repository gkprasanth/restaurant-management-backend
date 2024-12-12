const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
// const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");
const morgan = require("morgan");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb+srv://gkpc2004:nMOAkDVkGqkmzaNG@cluster0.0z063.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors());
app.use(morgan("dev")); // Logs HTTP requests

// Routes
app.get("/", (req, res) => {
  res.send("ping");
});
app.use("/api/users", userRoutes);
const orderRoutes = require('./routes/orderRoutes');  // Import your routes
app.use("/api",orderRoutes); // Use the routes in your app
app.use("/menu", menuRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});