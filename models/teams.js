var mongoose = require('mongoose')
var Schema = mongoose.Schema
var logger = require('winston')
var Student = require('./student')

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
exports.addMember = function (id, memberId, cb) {
  Team.findOne({_id: id}, function (err, team) {
    if (err) {
      logger.warn('Could not find team', {err: err, id: id})
      cb(err, null)
    } else {
      Student.getById(memberId, function (err, student) {
        var member = {
          name: student.name,
          email: student.email,
          _id: student._id
        }
        if (err) {
          logger.warn("Could not find student", {err: err, id: id})
        } else {
          if (team.members.length === 0 || team.members.indexOf(student) !== -1) {
            team.members.push(member)
            team.save(function (err, team) {
              cb(err, team)
            })
          } else {
            logger.info("Member already in team")
            cb("Member already in team")
          }
        }
      })
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
