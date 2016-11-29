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
      var result = StrategyRandom.formTeams(classObj.roster, preserveTeams ? classObj.teams : [], classObj.minGroup, classObj.maxGroup)
      logger.info(result)
      break
  }

  var newTeams = result.teams
  var newDetails = result.details

  logger.info(newTeams.length)
  logger.info(newDetails)

  for (var i = 0; i < newTeams.length; i++) {
    var curTeam = newTeams[i]
    if (!curTeam._id) {
      logger.info("asdsad")
      Teams.create(classObj._id, curTeam.members, function (err, resp) {
        if (err) {
          logger.info(err)
        } else {
          logger.info("ASdassd")
          Course.addTeam(classObj._id, resp._id, function (err, resp) {
            if (err) {
              logger.info(err)
            } else {
              logger.info("Sucessfuly creatd a team")
            }
          })
        }
      })
    } else {
      for (var j = 0; j < curTeam.members; j++) {
        Teams.addMember(curTeam._id, curTeams.member, function (err, resp) {
          if (err) {
            logger.info(err)
          }
        })
      }
    }
  }
  cb(null, 'Success')
}
