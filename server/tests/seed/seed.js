const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const {User} = require('../../models/user');
const {Todo} = require('../../models/todo');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'yofriadi@email.com',
  password: '123abc!',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userOneId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'root@email.com',
  password: '@root!',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userTwoId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}

const todos = [{
  _id: new ObjectID,
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID,
  text: 'Second test todo',
  completed: true,
  completedAt: 666,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

module.exports = {
  users,
  todos,
  populateUsers,
  populateTodos,
};
