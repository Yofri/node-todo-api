const _ = require('lodash');
const {User} = require('../models/user');
const {ObjectID} = require('mongodb');

const postUsers = async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    const auth = await res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getUsers = (req, res) => {
  res.send(req.user);
};

const postUsersLogin = async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();

    res.header('x-auth', token).send(user);
  } catch (err) {
    res.status(400).send()
  }
}

const deleteUsersToken = async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status(200).send();
  } catch (err) {
    res.status(400).send();
  }
}

module.exports = {
  postUsers,
  getUsers,
  postUsersLogin,
  deleteUsersToken
}
