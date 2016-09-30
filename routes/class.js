var express = require('express')
var path = require('path')
var router = express.Router()
var Course = require('../models/course')

var getAll = function (req, res, next) {

}

var getClass = function (req, res, next) {

}

var addClass = function (req, res, next) {

}

router.route('/all')
  .get(getAll)
router.route('/:id')
  .get(getClass)
  .post(addClass)

module.exports = router
