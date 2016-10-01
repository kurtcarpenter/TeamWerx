var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProfessorSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, expires: '12h', default: Date.now() },
  isStudent: { type: Boolean, required: true, default: true }
})
var Professor = mongoose.model('professor', ProfessorSchema)

exports.getById = function (id, cb) {
  Professor.find({_id: id})
}

exports.getByEmail = function (email, cb) {
  Professor.find({email: email})
}
