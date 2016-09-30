var logger = require('winston')
var mongoose = require('mongoose')
var courseSchema = {
  // CS 4400 J
  department: {type: String, required: true},
  number: {type: Number, required: true},
  section: {type: String, required: true},
  // SPRING, FALL, SUMMER
  semester: {type: String, required: true},
  year: {type: Number, required: true},
  // creator, TA uid
  admins: {type: Array, required: true},
  // student uid
  roster: {type: Array, required: true},
  // student groups may range from... 3-5 people
  minGroup: {type: Number, required: true},
  maxGroup: {type: Number, required: true},
  // how are we grouping? Random, auto-assign, free?
  matchingStrategy: {type: String, required: true}
}

var Course = mongoose.model('course', courseSchema)

var SEMESTERS = ['SPRING', 'FALL', 'SUMMER']
var MATCH_STRATEGIES = ['RANDOM', 'AUTO', 'CHOOSE']

// cb(err, ret)
exports.add = function (params, cb) {
  /*if (!params.admins || params.admins.length <= 0) {
    return cb('Invalid admins list: must have at least 1')
  }*/
  logger.info(params)
  if (!params.minGroup || !params.maxGroup || params.minGroup < 0 || params.maxGroup < params.minGroup) {
    return cb('Invalid group size limits')
  }
  if (SEMESTERS.indexOf(params.semester) < 0) {
    return cb('Invalid semester')
  }
  if (MATCH_STRATEGIES.indexOf(params.matchingStrategy) < 0) {
    return cb('Invalid matching strategy')
  }
  params.roster = ['sadsa']
  params.admins = ['sadsa']
  Course.create(params, function (err, ret) {
    if (err) {
      logger.warn('Could not create class', {params: params, err: err})
      return cb({err: err})
    } else {
      return cb(null, ret)
    }
  })
}

// cb(err, ret)
exports.getAll = function (cb) {
  Course.find({}, function (err, ret) {
    if (err) {
      logger.warn('Could not get all classes', {err: err})
      return cb({err: err})
    } else {
      return cb(null, ret)
    }
  })
}

// cb(err, ret)
exports.get = function (id, cb) {
  Course.findOne({_id: id}, function (err, ret) {
    if (err) {
      logger.warn('Could not find class', {err: err, id: id})
    } else {
      return cb(null, ret)
    }
  })
}
