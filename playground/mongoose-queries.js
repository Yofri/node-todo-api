const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

const id = '598c5d23cddbd3211c92db841';

if (!ObjectID.isValid(id)) console.log('ID not valid');

// Todo.find({_id: id}).then(todos => console.log(JSON.stringify(todos, undefined, 2)));
//
// Todo.findOne({_id: id}).then(todo => console.log(JSON.stringify(todo, undefined, 2)));

Todo.findById(id).then((todo) => {
  if (!todo) return console.log('ID not found');
  console.log(JSON.stringify(todo, undefined, 2));
}, () => {
  console.log('Invalid ID');
});
