var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TeamSchema = new Schema({
  classId: { type: String, required: true},
  createdAt: { type: Date, expires: '12h', default: Date.now },
  members: { type: Array, required: true}
})
var Team = mongoose.model('team', TeamSchema)

exports.getById = function (id, cb) {
  Team.findOne({_id: id}, cb)
}

exports.getAllByClass = function (classId, cb) {
  Team.find({classId: classId}, cb)
}

exports.create = function (classId, members, cb) {
  var team = {
    classId: classId,
    members: members || []
  }
  Team.create(team, cb)
}

exports.addMember = function (id, member, cb) {
  Team.findOne({_id: id}, function (err, team) {
    if (err) {
      logger.warn('Could not find team', {err: err, id: id})
    } else {
      team.members.push(member)
      team.save(function (err, team) {
        return cb(err, team)
      })
    }
  })
}
