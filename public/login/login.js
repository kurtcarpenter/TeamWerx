var welcome = angular.module('teamwerx.login', ['ngRoute'])

welcome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'login/login.html',
    controller: 'loginCtrl',
    controllerAs: 'ctrl'
  })
}])

welcome.controller('loginCtrl', function ($rootScope, $scope, $http, $window) {
  var ctrl = this

  function getCurrentUser (cb) {
    $http.post('/currentuser').then(function success (res) {
      $rootScope.user = res.data
      console.log('USER: ' + JSON.stringify(res.data))
      cb()
    }, function error (e) {
      ctrl.msg = 'Invalid username or password'
      console.warn(e)
    })
  }

  ctrl.login = function (username, password) {
    $http.post('/login', {
      username: username,
      password: password
    }).then(function success () {
      getCurrentUser(function () {
        if (password === 'student') {
          $window.location.href = '/#!/student/home'
        } else {
          $window.location.href = '/#!/prof/home'
        }
      })
    }, function error (e) {
      console.warn(e)
    })
  }

  // ctrl.loginAsProfessor = function (email) {
  //   login(email, 'professor', function () {
  //
  //   })
  // }
  //
  // ctrl.loginAsStudent = function (email) {
  //   login(email, 'student', function () {
  //
  //   })
  // }
})
