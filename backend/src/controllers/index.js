const express = require("express");
const app = express();

const userRoutes = require("./user");
const taskRoutes = require("./task");

app.use("/api/user", userRoutes);
app.use("/api/news", taskRoutes);
module.exports = app;
