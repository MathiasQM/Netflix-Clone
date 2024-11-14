const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const moviesRoute = require("./routes/movies");
const authRoutes = require("./routes/auth");
const db = require("./db");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/movies", moviesRoute);
app.use("/auth", authRoutes);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(8080);
  }
});
