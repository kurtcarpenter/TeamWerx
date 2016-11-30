var express = require('express')
var router = express.Router()
var csv = require('csv')
var json2csv = require('json2csv')

var Course = require('../models/course')
var Student = require('../models/student')
var Matcher = require('../lib/matcher/matcher')
var Team = require('../models/teams')
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
      Student.findByClass(req.params.id, function (err, roster) {
        ret.roster = roster
        res.send(ret)
      })
    }
  })
}

function determineColumnIndexes (csvData, columnNames) {
  var indexes = {}
  var columns = csvData[0]
  for (var i = 0; i < columnNames.length; i++) {
    var column = columnNames[i]
    var index = columns.indexOf(column)
    if (index === -1) {
      return null
    }
    indexes[column] = index
  }
  return indexes
}

function importAndEnrollStudents (roster, courseId, cb) {
  if (!roster) {
    return cb('Please specify a CSV file.')
  }
  csv.parse(roster, function (err, csvData) {
    if (err) {
      logger.warn(err)
      return cb('Could not parse CSV file.')
    }

    var students = []

    var columnIndexes = determineColumnIndexes(csvData, ['Name', 'User ID', 'Email Address', 'Role'])
    // First row are column names so skip it.
    for (var i = 1; i < csvData.length; i++) {
      var studentData = csvData[i]
      var name = studentData[columnIndexes['Name']]
      var userId = studentData[columnIndexes['User ID']]
      var email = studentData[columnIndexes['Email Address']]
      var role = studentData[columnIndexes['Role']]

      if (role !== 'Student') {
        logger.debug('Skipping row because not a student: ' + studentData)
        continue
      }

      students = 0
      // TODO: Handle failures in this function.
      Student.addStudentOrAddClass(name, userId, email, courseId, function (err) {
        if (err) {
          return cb(err)
        }
      })
      students++
    }

    return cb(null, students)
  })
}

var addClass = function (req, res, next) {
  var classData = req.body.class
  var params = {
    name: classData.name,
    semester: classData.semester,
    year: classData.year,
    professors: [req.user._id],
    roster: [],
    minGroup: classData.minGroup,
    maxGroup: classData.maxGroup
  }
  Course.add(params, function (err, course) {
    logger.info(err)
    if (err) {
      res.status(500).send()
    } else {
      // All students will be enrolled after the response is returned.
      importAndEnrollStudents(req.body.roster, course._id, function () {
        logger.info('Finished enrolling students.')
      })
      res.send(course)
    }
  })
}

var assignUnmatched = function (req, res, next) {
  Course.get(req.params.id, function (err, ret) {
    if (err) {
      res.status(500).send()
    } else {
      Student.findByClass(req.params.id, function (err, roster) {
        ret.roster = roster
        Matcher.formTeams(ret, 'RANDOM', req.body.preserveTeams, function (err, resp) {
          if (err) {
            res.send(500)
          } else {
            res.send(200)
          }
        })
      })
    }
  })
}

function exportRoster (req, res) {
  Team.getAllByClass(req.params.id, function (err, teams) {
    if (err) {
      logger.warn(err)
      return res.send(500)
    }

    var roster = []
    for (var i = 0; i < teams.length; i++) {
      var team = teams[i]
      for (var j = 0; j < team.members.length; j++) {
        var member = team.members[j]
        roster.push({
          'Name': member.name,
          'Email Address': member.email,
          'Team Name': team.name,
          'Team Number': i + 1 // Index by 1 for people
        })
      }
    }

    try {
      var csvRoster = json2csv({data: roster})
      res.setHeader('Content-disposition', 'attachment; filename=teams.csv')
      res.setHeader('Content-type', 'text/csv')

      var fileContents = new Buffer(csvRoster, 'utf-8')

      return res.send(200, fileContents)
    } catch (err) {
      // Errors are thrown for bad options, or if the data is empty and no fields are provided.
      // Be sure to provide fields if it is possible that your data array will be empty.
      console.error(err)
      return res.send(500, err)
    }
  })
}

router.route('/')
  .get(getAll)
  .post(addClass)
router.route('/:id')
  .get(getClass)
router.route('/:id/match')
  .post(assignUnmatched)
router.route('/:id/export')
  .get(exportRoster)
module.exports = router
