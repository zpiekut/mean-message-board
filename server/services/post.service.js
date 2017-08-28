var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('posts');

var service = {};

service.getAll = getAll;
service.create = create;
service.deleteAll = _deleteAll;

module.exports = service;

function getAll() {
  var deferred = Q.defer();

  db.posts.find().toArray(function (err, posts) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(posts);
  });

  return deferred.promise;
}

function create(post) {
  var deferred = Q.defer();

  db.posts.insert(
      post,
      function (err, doc) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve();
      });
  

  return deferred.promise;
}

function _deleteAll() {
  var deferred = Q.defer();

  db.posts.remove(function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
  });

  return deferred.promise;
}