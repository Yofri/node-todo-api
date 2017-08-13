require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const controller = require('./controllers/controller');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', controller.postTodos);
app.get('/todos', controller.getTodos);
app.get('/todos/:id', controller.getTodosId);
app.delete('/todos/:id', controller.deleteTodosId);
app.patch('/todos/:id', controller.patchTodosId);
app.listen(port, () => console.log(`App started on port ${port}`));

module.exports = {app};
