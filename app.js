var express = require('express')
var path = require('path')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var logger = require('winston')
var session = require('express-session')

var config = require('./config')
var publicRoutes = require('./routes/public')
var classRoutes = require('./routes/class')

function initDatabase () {
  var mongoUri = config.MONGO_URI
  mongoose.connect(mongoUri, function (err) {
    if (err) {
      logger.error('Could not connect to the database.', {err: err})
    } else {
      logger.info('Successfully connected to the database.')
    }
  })
}
initDatabase()

var app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('common')) // Note that static resources won't be logged.
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', publicRoutes)
app.use('/api/class/', classRoutes)

// Sets up login route for professors and students.
require('./routes/auth')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})

module.exports = app
