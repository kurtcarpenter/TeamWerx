var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StudentSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, expires: '12h', default: Date.now() },
  isStudent: { type: Boolean, required: true, default: true }
})
var Student = mongoose.model('student', StudentSchema)

exports.getById = function (id, cb) {
  Student.find({_id: id})
}

exports.getByEmail = function (email, cb) {
  Student.find({email: email})
}
