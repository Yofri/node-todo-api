const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos')
    // .findOneAndUpdate({
    //   _id: new ObjectID('598ab7144d936a019fab7840')
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }, {
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result);
    // });

    db.collection('Users')
      .findOneAndUpdate({
        _id: new ObjectID('598a4c1884f11407d0f13f31')
      }, {
        $set: {
          name: 'Yofri'
        },
        $inc: {
          age: 1
        }
      }, {
        returnOriginal: false
      }).then((result) => {
        console.log(result);
      });

    // db.close();
});
