
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//MongoDB connection
mongoose
        .connect("mongodb://localhost:27017/toDoList")
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error: ", err));

//Task Schema and Model
const taskSchema = new mongoose.Schema({ 
    text: {type: String, required: true},
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model("Task", taskSchema);

//Routes
app.get("/tasks", async (req, res) => {
    try {
        const task = await Task.find();
        res.json(task);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

app.post("/tasks", async (req, res) => {
    const { text } = req.body;
    try {
        const newTask = await Task.create({ text });
        res.status(201).json(newTask);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

app.patch("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try{
        const updateTask = await Task.findByIdAndUpdate(id,{ completed }, { new: true });
        res.json(updateTask);
    }
    catch(err) {
        res.status(500).json(err.message);
    }
});


app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});