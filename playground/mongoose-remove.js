const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

// not return removed todo
Todo.remove({}).then(result => console.log(result));

Todo.findOneAndRemove({
  _id: '598da77022f2e60c113cec72'
}).then((todo) => {
  console.log(JSON.stringify(todo, undefined, 2));
});

Todo.findByIdAndRemove('598da77022f2e60c113cec72')
  .then((todo) => {
    console.log(JSON.stringify(todo, undefined, 2));
  });
