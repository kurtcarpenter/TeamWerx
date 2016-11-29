/**
  * This strategy randomly assigns students.
  * TODO: if we have small groups (e.g. 2 and 3), combine them into one.
  *
  * All strategies should contain:
  *
  * exports.formTeams (roster, teams)
  * return: {
  *   teams: [team1: {}, team2: {}...],
  *   details: 'Two teams were overfilled to match all students.'
  * }
*/

var logger = require('winston')

exports.formTeams = function (roster, teams, min, max) {
  if (!roster || !teams || !Array.isArray(roster) || !Array.isArray(teams)) {
    logger.warn('Invalid input to random.formTeams')
  }
  if (!min || !max) {
    logger.warn('Invalid size parameters to random.formTeams')
    return
  }
  var finalTeams = teams // load up the teams we might need

  var avgSize = Math.ceil((min + max) / 2)
  var totalTeams = Math.ceil(1.0 * roster.length / avgSize)
  var overfilled = 0
  var unmatched = 0

  logger.info({avg: avgSize, total: totalTeams})

  // initialize the teams array with n buckets
  for (var i = 0; i < totalTeams - finalTeams.length; i++) {
    finalTeams.push({
      teamno: i,
      members: []
    })
  }

  logger.info(finalTeams)

  // put people into buckets
  for (var i = 0; i < roster.length; i++) {
    var hash = hashStudent(roster[i]) % totalTeams
    var placed = false
    for (var j = 0; j < roster.length; j++) {
      var pos = (hash + j) % totalTeams
      if (finalTeams[pos].members.length < max) {
        finalTeams[pos].members.push(roster[i])
        placed = true
        break
      }
    }
    // if no teams have a slot, we put this person in the first team < max + 1
    if (!placed) {
      for (var j = 0; j < finalTeams.length; j++) {
        if (finalTeams[j].members.length <= max) {
          finalTeams[pos].members.push(roster[i])
          placed = true
          overfilled++
        }
      }
    }
    if (!placed) {
      unmatched++
    }
  }

  return {
    teams: finalTeams,
    details: 'Overfilled teams:' + overfilled +
        '; unmatched students: ' + unmatched
  }
}

function hashStudent (student) {
  var hashMe = student.email
  var total = 0
  for (var i = 0; i < hashMe.length; i++) {
    total += hashMe[i].charCodeAt(0)
  }
  return total
}
