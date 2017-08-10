const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

let newTodo = new Todo({
  text: 'Cook dinner'
});

// newTodo.save().then((doc) => {
//   console.log('Saved todo');
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save todo');
//   console.log(JSON.stringify(err, undefined, 2));
// });

module.exports = {Todo};
