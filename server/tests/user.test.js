const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('../server');
const {User} = require('../models/user');
const {users, todos, populateUsers, populateTodos} = require('./seed/seed');

beforeEach(populateUsers);

describe('POST /users', () => {
  it('should create a user', (done) => {
    const email = 'dummy@email.com';
    const password = 'root123';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
        }).catch(err => done(err));
      })
      .end(done);
  });

  it('should return validation errors if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'notanemail.com',
        password: 'root'
      })
      .expect(400)
      .end(done);
  });

  it('should not create a use if email in use', (done) => {
    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: 'root123!'
      })
      .expect(400)
      .end(done);
  });
});

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          });
        }).catch(err => done(err));
      })
      .end(done);
  });

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '*'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1);
        }).catch(err => done(err));
      })
      .end(done);
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
        }).catch(err => done(err));
      })
      .end(done);
  });
});