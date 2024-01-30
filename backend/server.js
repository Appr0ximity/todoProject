const express = require('express')
const Todo = require("./schema")
const connectDB = require("./connect")
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const port = 3000

connectDB()

app.use(express.json())
app.use(cors())

app.get('/todos', async (req, res) => {
    try {
        const Todos = await Todo.find()
        res.status(200).json(Todos)
    } catch (e) {
        res.status(500).json({
            msg: e.message
        })
    }
})

app.post('/todo', async (req, res) => {
    try {
        const {title, description} = req.body
        console.log(title, description)
        const newTodo = new Todo({
            title: title,
            description: description,
            completed: false
        })

        console.log(newTodo)



        await newTodo.save()

        res.status(201).json(newTodo)
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

app.put('/edit/:id', async (req, res) => {
    try {
        const id = req.params.id
        const {title, description, completed } = req.body

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid Todo ID')
        }

        let previousTodo = await Todo.findById(id)

        if (!previousTodo){
            throw new Error('Todo not found!')
        }

        previousTodo.title = title
        previousTodo.description = description
        previousTodo.completed = completed

        await previousTodo.save()

    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

app.delete('/done/:id', async (req, res) => {
    try {
        const id = req.params.id

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('Invalid Todo ID')
        }

        await Todo.findByIdAndDelete(id)

        res.status(204).json({
            msg: "Todo deleted successfully"
        })

    } catch (error) {
        res.status(400).json({
            msg: error.message
        })
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})