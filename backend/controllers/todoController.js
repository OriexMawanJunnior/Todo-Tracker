const { Todo } = require('../models/index');

exports.getAllTodos = async (req, res, next) => {
    try{
        const todos = await Todo.findAll();
        res.status(200).json(todos);
    }catch(err){
        next(err);
    }
};

exports.createTodo = async (req, res, next) => {
    try{
        const {title, description} = req.body;
        if(!title){
            return res.status(400).json({error:'title is required'});
        }
        const newTodo = await Todo.create({title, description});
        res.status(201).json(newTodo);
    }catch(err){
        next(err);
    }
};  

exports.updateTodo = async (req, res, next) => {
    try{
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "todo is not found" });
        }
        const { title, description, completed } = req.body;
        if (title !== undefined && title.trim() === '') {
            return res.status(400).json({ error: 'Title cannot be empty' });
        }
        const updatedTodo = await todo.update({ title, description, completed });
        res.status(200).json(updatedTodo);
    }catch(err){
        next(err);
    }
};

exports.deleteTodo = async (req, res, next) => {
    try{
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if(!todo){
            return res.status(404).json({error: "todo is not found"})
        }
        await todo.destroy();
        res.status(204).send();
    }catch(err){
        next(err);
    }
};
