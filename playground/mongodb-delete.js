const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos')
    //   .deleteMany({
    //     text: 'Eat lunch'
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   });

    // db.collection('Todos')
    //   .deleteOne({
    //     text: 'Walk the dog'
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   });

    db.collection('Todos')
      .findOneAndDelete({
        text: 'Something to do'
      })
      .then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
      });

    // db.close();
});
