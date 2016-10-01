var welcome = angular.module('teamwerx.login', ['ngRoute'])

welcome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl',
    controllerAs: 'ctrl'
  })
}])

welcome.controller('loginCtrl', function ($scope, $http, $window) {
  var ctrl = this

  function login (username, password, cb) {
    $http.post('/login', {
      username: username,
      password: password
    }).then(function success () {
      cb()
    }, function error (e) {
      console.warn(e)
    })
  }

  ctrl.loginAsProfessor = function (email) {
    login(email, 'professor', function () {
      $window.location.href = '/#!/prof/home'
    })
  }

  ctrl.loginAsStudent = function (email) {
    login(email, 'student', function () {
      $window.location.href = '/#!/student/home'
    })
  }
})
