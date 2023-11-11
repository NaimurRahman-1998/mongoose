const express = require("express");
const router = express.Router();

// Get/read method
router.get("/", (req, res) => {
  res.send("getting all todos");
});

module.exports = router;
