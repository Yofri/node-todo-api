const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
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
