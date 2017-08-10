const mongoose = require('mongoose');

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

let newUser = new User({
  email: 'yofriadiyahya@gmail.com '
});

// newUser.save().then((doc) => {
//     console.log('User saved');
//     console.log(JSON.stringify(doc, undefined, 2));
//   }, (err) => {
//     console.log('Unable to save user');
//     console.log(JSON.stringify(err, undefined, 2));
// });

module.exports = {User};
