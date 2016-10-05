var express = require('express')
var router = express.Router()
var Course = require('../models/course')
var logger = require('winston')

var getAll = function (req, res, next) {
  Course.getAll(req.user._id, function (err, classes) {
    if (err) {
      res.status(500).send()
    } else {
      res.send({classes: classes})
    }
  })
}

var getClass = function (req, res) {
  Course.get(req.params.id, function (err, ret) {
    if (err) {
      res.status(500).send()
    } else {
      res.send(ret)
    }
  })
}

var addClass = function (req, res, next) {
  var params = {
    name: req.body.name,
    semester: req.body.semester,
    year: req.body.year,
    professors: [req.user._id],
    roster: [],
    minGroup: req.body.minGroup,
    maxGroup: req.body.maxGroup
  }
  Course.add(params, function (err, ret) {
    logger.info(err)
    if (err) {
      res.status(500).send()
    } else {
      res.send(ret)
    }
  })
}

router.route('/')
  .get(getAll)
  .post(addClass)
router.route('/:id')
  .get(getClass)

module.exports = router
