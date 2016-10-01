var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var Professor = require('../models/professor')
var Student = require('../models/student')

module.exports = function (app) {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function (user, done) {
    // `isStudent` is true for students, undefined for professors.
    done(null, {isStudent: user.isStudent, id: user._id})
  })

  passport.deserializeUser(function (userMeta, done) {
    if (userMeta.isStudent) {
      Student.get(userMeta.id, function (err, student) {
        done(err, student)
      })
    } else {
      Professor.get(userMeta.id, function (err, professor) {
        done(err, professor)
      })
    }
  })

  passport.use(new LocalStrategy(
    // For now, username should be an email address and password should be "professor" or "student".
    function (username, password, done) {
      var Model = password === 'professor' ? Professor : Student
      Model.getByEmail(username, function (err, professor) {
        if (err) {
          return done(err)
        } else if (!professor) {
          Model.register(professor, function (err, professor) {
            if (err) {
              return done(err)
            } else {
              return done(null, professor)
            }
          })
        } else {
          return done(null, professor)
        }
      })
    }
  ))

  app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
}
