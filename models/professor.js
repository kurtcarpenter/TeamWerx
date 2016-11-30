var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfessorSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, expires: '12h', default: Date.now },
  isStudent: { type: Boolean, required: true, default: false }
})
var Professor = mongoose.model('professor', ProfessorSchema)

exports.getById = function (id, cb) {
  Professor.findOne({_id: id}, cb)
}

exports.getByEmail = function (email, cb) {
  Professor.findOne({email: email}, cb)
}

exports.register = function (email, cb) {
  var professor = {
    email: email,
    isStudent: false
  }
  Professor.create(professor, cb)
}
