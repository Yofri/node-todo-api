const _ = require('lodash');
const {User} = require('../models/user');
const {ObjectID} = require('mongodb');

const postUsers = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch(err => res.status(400).send(err));
};

const getUsers = (req, res) => {
  res.send(req.user);
};

const postUsersLogin = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch(() => res.status(400).send());
}

module.exports = {
  postUsers,
  getUsers,
  postUsersLogin
}
