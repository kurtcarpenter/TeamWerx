var mongoose = require('mongoose')
var Schema = mongoose.Schema
var logger = require('winston')

var TeamSchema = new Schema({
  classId: {type: Schema.ObjectId, required: true},
  name: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  members: {type: Array, default: []},
  pendingMembers: {type: Array, default: []},
  requireApproval: {type: Boolean, required: true}
})
var Team = mongoose.model('team', TeamSchema)

exports.getById = function (id, cb) {
  Team.findOne({_id: id}, cb)
}

exports.getAllByClass = function (classId, cb) {
  Team.find({classId: classId}, cb)
}

exports.getAllInClasses = function (classIds, cb) {
  Team.find({classId: {$in: classIds}}, cb)
}

exports.create = function (classId, members, cb, name) {
  logger.info("CLASS ID", classId)
  var team = {
    classId: classId,
    members: members || [],
    requireApproval: true,
    pendingMembers: [],
    name: name || 'Unamed Team'
  }
  logger.info(team)
  Team.create(team, cb)
}

/**
 * Add student to a team.
 * @param id Team id
 * @param member member id
 * @param cb Callback function cb(err, ret)
 */
exports.addMember = function (id, member, cb) {
  Team.findOne({_id: id}, function (err, team) {
    if (err) {
      logger.warn('Could not find team', {err: err, id: id})
      cb(err, null)
    } else {
      if (team.members.indexOf(member) !== -1) {
        team.members.push(member)
        team.save(function (err, team) {
          return cb(err, team)
        })
      }
    }
  })
}

/**
 * Apply to join a team.
 * @param id Team id
 * @param member member id
 * @param cb Callback function cb(err, ret)
 */
exports.addPendingMember = function (id, member, cb) {
  Team.findOne({_id: id}, function (err, team) {
    if (err) {
      logger.warn('Could not find team', {err: err, id: id})
      cb(err, null)
    } else {
      if (team.members.indexOf(member) !== -1 && team.pendingMembers.indexOf(member) !== -1) {
        team.pendingMembers.push(member)
        team.save(function (err, team) {
          return cb(err, team)
        })
      } else {
        cb('Student already a team member or has a pending application', null)
      }
    }
  })
}

/**
 * Accept or reject a pending member.
 * @param id Team id
 * @param member member id
 * @param accept Accept or reject the student
 * @param cb Callback function cb(err, ret)
 */
exports.judgePendingMember = function (id, member, accept, cb) {
  Team.findOne({_id: id}, function (err, team) {
    if (err) {
      logger.warn('Could not find team', {err: err, id: id})
      cb(err, null)
    } else if (team.pendingMembers.indexOf(member) < 0) {
      cb('Student does not have a pending application', null)
    } else {
      team.pendingMembers.splice(team.pendingMembers.indexOf(member), 1)
      if (accept) {
        team.members.push(member)
        cb(null, 'Team member added')
      } else {
        cb(null, 'Pending member rejected')
      }
    }
  })
}
