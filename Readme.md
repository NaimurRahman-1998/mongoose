first create express app

then connect mongoose

```js
mongoose
  .connect("mongodb://0.0.0.0:27017/todos")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
```

then create a router in different file

then create a schema

```js
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
```

then create a model for that schema
so that we can create a object data model and say which type od data are we going to send

```js
const Todo = new mongoose.model("Todo", todoSchema);
```

we are creating a class and saying it will follow todosSchema

```js
new mongoos.model("Singular Name", Schema);
```

after that when client will send a data , it will check if the data is the instance of the todoSchema class

```js
router.post("/", (req, res) => {
  const data = new Todo(req.body); // creating an instance and saving it
  data.save((err) => {
    // .save() will add data to Database
    if (err) {
      res.status(500).send("there was a server side error");
    } else {
      res.status(200).send("todo added successfully");
    }
  });
});
```

for adding many insertMany

```
Todo.insertMany(req.body)
```

Mongoose Schema Method :

we make a schema and add to model to make a class.

in that schema we can make a method fucntion

```js
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
};
```

and then we can make a instance and call the method

```js
const todo = new Todo();
const data = await todo.findActive();
```

static method

```js
todoSchema.statics = {
  findByJs: function () {
    return this.find({ title: /js/i });
  },
};

router.get("/activeStatic", async (req, res) => {
  try {
    const data = await Todo.findByJs();
    res.status(200).json({ data: data });
  } catch (error) {
    // Handle any errors appropriately, for example:
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```
