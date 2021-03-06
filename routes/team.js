var express = require('express')
var router = express.Router()

var Team = require('../models/teams')
// var Student = require('../models/student')
var Course = require('../models/course')
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

// this method probably does not work
var getAllByClass = function (req, res, next) {
  console.log(req.params)
  Team.getAllByClass(req.params.classId, function (err, teams) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({teams: teams})
    }
  })
}

var create = function (req, res, next) {
  if (req.user.isStudent) {
    var members = [{
      name: req.user.name,
      email: req.user.email,
      _id: req.user._id
    }]
  } else {
    var members = []
  }
  Team.create(req.params.classId, members, function (err, team) {
    if (err) {
      logger.warn(err)
      res.status(500).send()
    } else {
      Course.addTeam(req.params.classId, team._id, function (err, resp) {
        if (err) {
          logger.warn(err)
          res.status(500).send()
        } else {
          res.status(200).send()
        }
      })
    }
  }, req.body.name)
}

var addMember = function (req, res, next) {
  Team.addMember(req.params.id, req.params.member, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(200).send()
    }
  })
}

var addPendingMember = function (req, res, next) {
  Team.addPendingMember(req.params.id, {
    name: req.user.name,
    email: req.user.email,
    _id: req.user._id
  }, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({team: team})
    }
  })
}

var judgePendingMember = function (req, res, next) {
  Team.judgePendingMember(req.params.id, req.params.member, req.query.accept, function (err, msg) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({msg: msg})
    }
  })
}

var findTeamOfMember = function (req, res, next) {
  Team.findTeamOfMember(req.params.class, req.params.member, function (err, team) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({team: team})
    }
  })
}

router.route('/class/:classId')
  .get(getAllByClass)
  .post(create)
router.route('/member/:member/:class')
  .get(findTeamOfMember)
router.route('/:id')
  .get(getById)
router.route('/:id/:member')
  .get(judgePendingMember)
  .post(addMember)
router.route('/req/:id')
  .put(addPendingMember)

module.exports = router
