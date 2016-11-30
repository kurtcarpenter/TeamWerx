var logger = require('winston')
var mongoose = require('mongoose')

var Team = require('./teams')

var courseSchema = {
  // CS 4400 J
  name: {type: String, required: true},
  // SPRING, FALL, SUMMER
  semester: {type: String, required: true},
  year: {type: Number, required: true},
  // List of ids of the `Professor`s who administer this course.
  professors: {type: [mongoose.Schema.ObjectId], required: true},
  // student groups may range from... 3-5 people
  minGroup: {type: Number, required: true},
  maxGroup: {type: Number, required: true},
  teams: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }], default: []} // contains team ids
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
  Course.find({professors: {$in: [_id]}}, function (err, courses) {
    if (err) {
      logger.warn('Could not get all classes', {err: err})
      return cb(err)
    } else {
      var courseIds = []
      for (var i = 0; i < courses.length; i++) {
        courseIds.push(courses[i]._id)
      }
      Team.getAllInClasses(courseIds, function (err, teams) {
        if (err) {
          logger.warn('Could not get teams for the class', {err: err})
          return cb(err)
        }

        for (var i = 0; i < courses.length; i++) {
          var course = courses[i]
          var studentsInTeams = 0
          for (var j = 0; j < teams.length; j++) {
            if (teams[i] && teams[i].classId === course._id) {
              studentsInTeams += teams[i].members.length
            }
          }
          course.studentsInTeams = studentsInTeams
        }
        return cb(null, courses)
      })
    }
  })
}

// cb(err, ret)
exports.get = function (id, cb) {
  Course.findOne({_id: id}).populate('teams').lean().exec(function (err, ret) {
    if (err) {
      logger.warn('Could not find class', {err: err, id: id})
    } else {
      return cb(null, ret)
    }
  })
}

exports.addTeam = function (id, team, cb) {
  Course.findOne({_id: id}, function (err, course) {
    if (err) {
      logger.warn('Could not find class', {err: err, id: id})
    } else {
      if (course.teams.indexOf(team) < 0) {
        course.teams.push(team)
        course.save(function (err, course) {
          if (err) {
            logger.info('err')
          }
          return cb(err, course)
        })
      } else {
        logger.info("Duplicate team cannot be added")
      }
    }
  })
}
