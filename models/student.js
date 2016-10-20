var mongoose = require('mongoose')
var Schema = mongoose.Schema

var StudentSchema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, expires: '12h', default: Date.now },
  isStudent: { type: Boolean, required: true, default: true },
  classes: { type: Array, default: []}
})
var Student = mongoose.model('student', StudentSchema)

exports.getById = function (id, cb) {
  Student.findOne({_id: id}, cb)
}

exports.getByEmail = function (email, cb) {
  Student.findOne({email: email}, cb)
}

exports.register = function (email, cb) {
  var student = {
    email: email
  }
  Student.create(student, cb)
}

exports.addClass = function (id, classId) {
  Student.findOne({_id: id}, function (err, student) {
    if (err) {
      logger.warn('Could not find student', {err: err, id: id})
    } else {
      student.classes.push(classId)
      student.save(function (err, student) {
        return cb(err, student)
      })
    }
  })
}
