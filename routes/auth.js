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
      Student.getById(userMeta.id, function (err, student) {
        done(err, student)
      })
    } else {
      Professor.getById(userMeta.id, function (err, professor) {
        done(err, professor)
      })
    }
  })

  passport.use(new LocalStrategy(
    // For now, username should be an email address and password should be "professor" or "student".
    function (username, password, done) {
      username = username.toLowerCase()
      var Model = password === 'professor' ? Professor : Student
      Model.getByEmail(username, function (err, account) {
        if (err) {
          return done(err)
        } else if (!account) {
          Model.register(username, function (err, account) {
            if (err) {
              return done(err)
            } else {
              return done(null, account)
            }
          })
        } else {
          return done(null, account)
        }
      })
    }
  ))

  app.post('/currentuser', function (req, res) {
    if (req.user) {
      res.json({
        email: req.user.email,
        isStudent: req.user.isStudent
      })
    } else {
      res.status(401).json({})
    }
  })

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/#!/',
    failureRedirect: '/#!/'
  }))
}
