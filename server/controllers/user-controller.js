const _ = require('lodash');
const {User} = require('../models/user');
const {ObjectID} = require('mongodb');

const postUsers = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }).catch(err => res.status(400).send(err));
}

module.exports = {
  postUsers
}
