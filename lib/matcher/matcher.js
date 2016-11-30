var logger = require('winston')
var StrategyRandom = require('./strategies/random')
var Teams = require('../../models/teams')
var Course = require('../../models/course')
/**
  * Puts students in a class into groups.
  *
  * @param classObj Object for the classObj
  * @param strategy Which matching strategy is used
  * @param preserveTeams Whether to preserve pre-formed teams or not
  * cb(err, details)
  */
exports.strategies = Object.freeze({
  'RANDOM': {
    'description': 'Places students into groups randomly.'
  }
})

exports.formTeams = function (classObj, strategy, preserveTeams, cb) {
  if (!cb || typeof cb !== 'function') {
    logger.warn('Failed to pass callback to matcher.formTeams')
    return
  }
  if (!exports.strategies[strategy]) {
    cb('Invalid matching strategy: ' + strategy)
  }
  if (!classObj.roster || !classObj.minGroup || !classObj.maxGroup) {
    cb('Malformed class object')
  }

  switch (strategy) {
    case 'RANDOM':
      var roster = classObj.roster
      var newRoster = []
      for (var k = 0; k < roster.length; k++) {
        var seen = false
        for (var i = 0; i < classObj.teams.length; i++) {
          for (var j = 0; j < classObj.teams[i].members.length; j++) {
            if (roster[k].email === classObj.teams[i].members[j].email) {
              seen = true
            }
          }
        }
        if (!seen) {
          newRoster.push(roster[k])
        }
      }
      var result = StrategyRandom.formTeams(newRoster, preserveTeams ? classObj.teams : [], classObj.minGroup, classObj.maxGroup)
      logger.info(result)
      break
  }

  var newTeams = result.teams
  var newDetails = result.details

  for (var i = 0; i < newTeams.length; i++) {
    var curTeam = newTeams[i]
    if (!curTeam._id) {
      Teams.create(classObj._id, curTeam.members, function (err, resp) {
        if (err) {
          logger.info(err)
        } else {
          Course.addTeam(classObj._id, resp._id, function (err, resp) {
            if (err) {
              logger.info(err)
            } else {
              logger.info("Successfully created a team")
            }
          })
        }
      }, curTeam.name)
    } else {
      for (var j = 0; j < curTeam.members.length; j++) {
        Teams.addMember(curTeam._id, curTeam.members[j]._id, function (err, resp) {
          if (err) {
            logger.info(err)
          }
        })
      }
    }
  }
  cb(null, 'Success')
}
