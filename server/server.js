require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const todoController = require('./controllers/todo-controller');
const userController = require('./controllers/user-controller');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', todoController.postTodos);
app.get('/todos', todoController.getTodos);
app.get('/todos/:id', todoController.getTodosId);
app.delete('/todos/:id', todoController.deleteTodosId);
app.patch('/todos/:id', todoController.patchTodosId);
app.post('/users', userController.postUsers)
app.listen(port, () => console.log(`App started on port ${port}`));

module.exports = {app};
