const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const postRoutes = require("./routes/posts.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// manage routes and controllers using this file
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});