var express = require('express')
var router = express.Router()

var Student = require('../models/student')
var logger = require('winston')

var updateProfile = function (req, res, next) {
  Student.updateProfile(req.query.email, req.query.profile, function (err, student) {
    if (err) {
      logger.warn('error occurred while updating profile', {err: err})
      res.status(500).send()
    } else {
      res.json({
        email: student.email,
        isStudent: student.isStudent,
        profile: student.profile || {}
      })
    }
  })
}

var getProfile = function (req, res, next) {
  Student.getByEmail(req.query.email, function (err, student) {
    if (err) {
      logger.warn('error occurred while getting profile', {err: err})
      res.status(500).send()
    } else {
      res.json({
        profile: student.profile || {}
      })
    }
  })
}

router.route('/')
  .get(updateProfile)
router.route('/profile')
  .get(getProfile)

module.exports = router
