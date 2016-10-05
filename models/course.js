var logger = require('winston')
var mongoose = require('mongoose')
var courseSchema = {
  // CS 4400 J
  name: {type: String, required: true},
  // SPRING, FALL, SUMMER
  semester: {type: String, required: true},
  year: {type: Number, required: true},
  // List of ids of the `Professor`s who administer this course.
  professors: {type: [mongoose.Schema.ObjectId], required: true},
  // student uid
  roster: {type: Array, required: false},
  // student groups may range from... 3-5 people
  minGroup: {type: Number, required: true},
  maxGroup: {type: Number, required: true}
}

var Course = mongoose.model('course', courseSchema)

var SEMESTERS = ['SPRING', 'FALL', 'SUMMER']

// cb(err, ret)
exports.add = function (params, cb) {
  logger.info(params)
  if (!params.professors || params.professors.length === 0) {
    return cb('Invalid professors list: must have at least 1')
  }
  if (!params.minGroup || !params.maxGroup || params.minGroup < 0 || params.maxGroup < params.minGroup) {
    return cb('Invalid group size limits')
  }
  if (SEMESTERS.indexOf(params.semester) < 0) {
    return cb('Invalid semester')
  }
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
exports.getAll = function (_id, cb) {
  _id = new mongoose.Types.ObjectId(_id)
  Course.find({professors: {$in: [_id]}}, function (err, ret) {
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
