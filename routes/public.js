var express = require('express')
var path = require('path')
var router = express.Router()

/* GET welcome page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/', 'app.html'))
})

module.exports = router
