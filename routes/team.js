var express = require('express')
var router = express.Router()

var Team = require('../models/teams')
var Student = require('../models/student')
var logger = require('winston')

var getById = function (req, res, next) {
  Team.getById(req.params.id, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({team: team})
    }
  })
}

var getAllByClass = function (req, res, next) {
  Team.getAllByClass(req.params.classId, function (err, teams) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({teams: teams})
    }
  })
}

var create = function (req, res, next) {
  Team.create(req.params.classId, req.params.members, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({team: team})
    }
  })
}

var addMember = function (req, res, next) {
  Team.addMember(req.params.id, req.params.member, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({team: team})
    }
  })
}

var addPendingMember = function (req, res, next) {
  Team.addPendingMember(req.params.id, req.params.member, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({team: team})
    }
  })
}

var judgePendingMember = function (req, res, next) {
  Team.judgePendingMember(req.params.id, req.params.member, req.params.accept, function (err, msg) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({msg: msg})
    }
  })
}

router.route('/')
  .get(getAllByClass)
  .post(create)
router.route('/:id')
  .get(getById)
router.route('/:id/:member')
  .get(judgePendingMember)
  .put(addPendingMember)
  .post(addMember)

module.exports = router
