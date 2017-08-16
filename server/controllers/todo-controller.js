const _ = require('lodash');
const {Todo} = require('../models/todo');
const {ObjectID} = require('mongodb');

const postTodos = (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch(() => res.status(400).send());
}

const getTodos = (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }).catch(() => res.status(400).send());
}

const getTodosId = (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) return res.status(404).send();
    res.send({todo});
  }).catch(() => res.status(400).send());
}

const deleteTodosId = (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) return res.status(404).send();

    res.send({todo});
  }).catch(() => res.status(400).send());
}

const patchTodosId = (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) return res.status(404).send();

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) return res.status(404).send();

      res.send({todo});
    }).catch(() => {
      res.status(404).send();
    });
}

module.exports = {
  postTodos,
  getTodos,
  getTodosId,
  deleteTodosId,
  patchTodosId
};
