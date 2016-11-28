var mongoose = require('mongoose')
var Schema = mongoose.Schema
var logger = require('winston')

var StudentSchema = new Schema({
  email: {type: String, required: true}, // Student's @gatech.edu email address.
  name: {type: String}, // Student's full name.
  createdAt: {type: Date, required: true, default: Date.now}, // Date the student was added.
  isStudent: {type: Boolean, required: true, default: true}, // True on all students (false on professors).
  studentId: {type: String}, // Used when exporting a class roster to CSV.
  classes: {type: [Schema.Types.ObjectId], default: []} // A list of IDs of all classes a student is enrolled in.
})
var Student = mongoose.model('student', StudentSchema)

exports.getById = function (id, cb) {
  Student.findOne({_id: id}, cb)
}

exports.getByEmail = function (email, cb) {
  email = email.toLowerCase()
  Student.findOne({email: email}, cb)
}

exports.register = function (email, cb) {
  email = email.toLowerCase()
  var student = {
    email: email
  }
  Student.create(student, cb)
}

exports.findByClass = function (id, cb) {
  Student.find({classes: id}, function (err, ret) {
    if (err) {
      logger.info("Could not find by class id", id)
      cb(err, null)
    } else {
      ret = ret.map(function (i) { return { name: i.name, email: i.email, _id: i._id} })
      cb(null, ret)
    }
  })
}

/**
 * Create a new student if the student doesn't already exist.
 * Then add the provided `classId` to the given student.
 */
exports.addStudentOrAddClass = function (name, userId, email, classId, cb) {
  if (!name || !userId || !email || !classId) {
    return cb('Please provide all relevant fields.')
  }
  email = email.toLowerCase()

  Student.update({email: email},
    {
      $set: {
        email: email,
        studentId: userId,
        name: name
      },
      $addToSet: {
        classes: classId
      }
    },
    {upsert: true}, cb)
}
