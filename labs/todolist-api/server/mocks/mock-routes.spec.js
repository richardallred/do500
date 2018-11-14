'use strict';

const app = require('../app');
const request = require('supertest');
require('should');

describe('GET /api/todos', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});

describe('POST /api/todos', function() {
  it('should create the todo and return with the todo', function(done) {
    request(app)
      .post('/api/todos')
      .send({title: 'learn about endpoint/server side testing', completed: false})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('_id');
        res.body.title.should.equal('learn about endpoint/server side testing');
        res.body.completed.should.equal(false);
        done();
      });
  });
});

describe('GET /api/todos/:id', function() {
  let todoId;
  beforeEach(function createObjectToUpdate(done) {
    request(app)
      .post('/api/todos')
      .send({title: 'learn about endpoint/server side testing', completed: false})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        todoId = res.body._id;
        done();
      });
  });
  it('should update the todo', function (done) {
    request(app)
      .get('/api/todos/' + todoId)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body._id.should.equal(todoId);
        res.body.title.should.equal('learn about endpoint/server side testing');
        res.body.completed.should.equal(false);
        done();
      });
  });
  it('should return 404 for valid mongo object id that does not exist', function(done){
    request(app)
      .get('/api/todos/' + 'abcdef0123456789ABCDEF01')
      .expect(404)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 for invalid object ids', function(done){
    request(app)
      .get('/api/todos/' + 123)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.equal('not a valid mongo object id')
        done();
      });
  });
});

describe('PUT /api/todos/:id', function() {
  let todoId;
  beforeEach(function createObjectToUpdate(done){
    request(app)
      .post('/api/todos')
      .send({title: 'learn about endpoint/server side testing', completed: false})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        todoId = res.body._id;
        done();
      });
  });
  it('should update the todo', function(done) {
    request(app)
      .put('/api/todos/' + todoId)
      .send({title: 'LOVE endpoint/server side testing!', completed: true})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('_id');
        res.body.title.should.equal('LOVE endpoint/server side testing!');
        res.body.completed.should.equal(true);
        done();
      });
  });
  it('should return 404 for valid mongo object id that does not exist', function(done){
    request(app)
      .put('/api/todos/' + 'abcdef0123456789ABCDEF01')
      .send({title: 'LOVE endpoint/server side testing!', completed: true})
      .expect(404)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 for invalid object ids', function(done){
    request(app)
      .put('/api/todos/' + 123)
      .send({title: 'LOVE endpoint/server side testing!', completed: true})
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.equal('not a valid mongo object id')
        done();
      });
  });
});

describe('DELETE /api/todos/:id', function() {
  let todoId;
  beforeEach(function createObjectToUpdate(done){
    request(app)
      .post('/api/todos')
      .send({title: 'learn about endpoint/server side testing', completed: false})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        todoId = res.body._id;
        done();
      });
  });
  it('should delete the todo', function(done) {
    request(app)
      .delete('/api/todos/' + todoId)
      .expect(204)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  it('should return 404 for valid mongo object id that does not exist', function(done){
    request(app)
      .delete('/api/todos/' + 'abcdef0123456789ABCDEF01')
      .expect(404)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  it('should return 400 for invalid object ids', function(done){
    request(app)
      .delete('/api/todos/' + 123)
      .send({title: 'LOVE endpoint/server side testing!', completed: true})
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.equal('not a valid mongo object id')
        done();
      });
  });
});
