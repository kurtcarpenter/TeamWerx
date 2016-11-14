var mongoose = require('mongoose')
var Schema = mongoose.Schema
var logger = require('winston')

var TeamSchema = new Schema({
  classId: {type: Schema.ObjectId, required: true},
  createdAt: {type: Date, default: Date.now},
  members: {type: Array, required: true},
  professorId: {type: Schema.ObjectId, required: true}
})
var Team = mongoose.model('team', TeamSchema)

exports.getById = function (id, professorId, cb) {
  Team.findOne({_id: id, professorId: professorId}, cb)
}

exports.getAllByClass = function (classId, professorId, cb) {
  Team.find({classId: classId, professorId: professorId}, cb)
}

exports.getAllInClasses = function (classIds, cb) {
  Team.find({classId: {$in: classIds}}, cb)
}

exports.create = function (classId, members, professorId, cb) {
  var team = {
    classId: classId,
    members: members || [],
    professorId: professorId
  }
  Team.create(team, cb)
}

exports.addMember = function (id, member, cb) {
  Team.findOne({_id: id}, function (err, team) {
    if (err) {
      logger.warn('Could not find team', {err: err, id: id})
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
