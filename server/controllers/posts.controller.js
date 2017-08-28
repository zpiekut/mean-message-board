var config = require('config.json');
var express = require('express');
var router = express.Router();
var postService = require('services/post.service');

// routes
router.get('/', getAll);
router.post('/create', create);
router.post('/deleteAll', deleteAll);

module.exports = router;

function create(req, res) {
  postService.create(req.body)
      .then(function () {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function getAll(req, res) {
  postService.getAll()
      .then(function (posts) {
          res.send(posts);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}

function deleteAll(req, res) {
  postService.deleteAll()
      .then(function (posts) {
          res.sendStatus(200);
      })
      .catch(function (err) {
          res.status(400).send(err);
      });
}