var express = require('express')
var router = express.Router()

var Student = require('../models/student')
var logger = require('winston')

var updateProfile = function (req, res, next) {
  logger.info('HERE')
  Student.updateProfile(req.params.email, req.params.profile, function (err, student) {
    if (err) {
      res.status(500).send()
    } else {
      logger.info('HERE2')
      res.json({
        email: student.email,
        isStudent: student.isStudent,
        profile: student.profile || {}
      })
    }
  })
}

router.route('/student')
  .get(updateProfile)

module.exports = router
