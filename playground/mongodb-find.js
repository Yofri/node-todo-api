const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos')
    //   .find({
    //     _id: new ObjectID('5989d6f5b10b091f441788d1')
    //   })
    //   .toArray()
    //   .then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2));
    //   }, (err) => {
    //     console.log('Unable to fetch todos', err);
    //   });

    db.collection('Todos')
      .find()
      .count()
      .then((count) => {
        console.log(`Todos count: ${count}`);
      }, (err) => {
        console.log('Unable to fetch todos', err);
      });

    // db.close();
});
