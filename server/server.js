require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch(() => res.status(400).send());
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }).catch(() => res.status(400).send());
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findById(id).then((todo) => {
    if (!todo) return res.status(404).send();

    res.send({todo});
  }).catch(() => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) return res.status(404).send();

    res.send({todo});
  }).catch(() => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) return res.status(404).send();

      res.send({todo});
    }).catch(() => {
      res.status(404).send();
    });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

module.exports = {app};
