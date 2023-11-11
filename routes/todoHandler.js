const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../Schemas/todoSchema");
const { ObjectId } = require("mongodb");
const router = express.Router();
const Todo = new mongoose.model("Todo", todoSchema);

// Get/read method
// router.get("/", async (req, res) => {
//   try {
//     const todos = await Todo.find({ status: "active" }).exec();
//     res.status(200).json({ result: todos });
//   } catch (error) {}
// });

router.get("/", async (req, res) => {
  try {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(500).json({ data: data });
  } catch (error) {}
});

// get by id
router.get("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const data = await Todo.findById({ _id: id });
  res.json({ result: data });
  res.send("asd");
});

// add todo
router.post("/", async (req, res) => {
  try {
    const data = new Todo(req.body);
    data.save();
    res.status(200).send("Todo added successfully");
    console.log("todo Added");
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

router.post("/many", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).send("Todos added successfully");
    console.log("todo Added");
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          status: "habijabi",
        },
      }
    );
    res.status(200).send("Updated Todo successfully");
    console.log("updated todo");
  } catch (error) {
    console.log(err);
    res.status(500).send(`error : ${err}`);
  }
});

router.delete("/:id", (req, res) => {
  res.send("getting all todos");
});

module.exports = router;
