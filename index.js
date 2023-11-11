const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routes/todoHandler");
// Connect to MongoDB

const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/todos")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use("/todo", todoHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
