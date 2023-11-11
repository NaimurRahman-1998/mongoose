first create express app

then connect mongoose

```
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

```
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

```
const Todo = new mongoose.model("Todo", todoSchema);
```

we are creating a class and saying it will follow todosSchema

```
new mongoos.model('Singular Name' , Schema)
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
