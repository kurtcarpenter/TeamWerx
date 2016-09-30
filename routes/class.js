var express = require('express')
var path = require('path')
var router = express.Router()
var Course = require('../models/course')
var logger = require('winston')

var getAll = function (req, res, next) {
  Course.getAll(function (err, ret) {
    if (err) {
      res.status(500).send()
    } else {
      res.send(ret)
    }
  })
}

var getClass = function (req, res, next) {
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
    department: req.body.department,
    number: req.body.number,
    section: req.body.section,
    semester: req.body.semester,
    year: req.body.year,
    admins: [],
    roster: [],
    minGroup: req.body.minGroup,
    maxGroup: req.body.maxGroup,
    matchingStrategy: req.body.matchingStrategy
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

// addClass({
//   body: {
//     department: 'CS',
//     number: 2340,
//     section: 'A',
//     semester: 'SPRING',
//     year: 2016,
//     minGroup: 2,
//     maxGroup: 3,
//     matchingStrategy: 'AUTO'
//   }
// })

router.route('/all')
  .get(getAll)
router.route('/:id')
  .get(getClass)
  .post(addClass)

module.exports = router
