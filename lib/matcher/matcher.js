var logger = require('winston')
var StrategyRandom = require('./strategies/random')
var Teams = require('../../models/teams')
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
      logger.info("ASdasd")
      logger.info(classObj.roster)
      logger.info(classObj.teams)
      var result = StrategyRandom.formTeams(classObj.roster, preserveTeams ? classObj.teams : [])
      break
  }

  var newTeams = result.teams
  var newDetails = result.details

  for (var i = 0; i < newTeams; i++) {
    var curTeam = newTeams[i]
    if (!curTeam._id) {
      Teams.create(classObj._id, curTeam.members, classObj.professors[0], function () {})
    } else {
      for (var j = 0; j < curTeam.members; j++) {
        Teams.addMember(curTeam._id, curTeams.member, function () {})
      }
    }
  }
  cb(null, 'Success')
}
