'use strict'

var teamwerx = angular.module('teamwerx', [
  'ngAria',
  'ngAnimate',
  'ngMessages',
  'ngRoute',
  'ngResource',
  'ngMaterial',
  'teamwerx.login',
  'teamwerx.profDetail',
  'teamwerx.profHome',
  'teamwerx.studentHome',
  'teamwerx.addClassModalCtrl',
  'teamwerx.studentDetail',
  'teamwerx.createTeamModalCtrl'
])

teamwerx.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
  // Just for Kurt
  $locationProvider.hashPrefix('!')
}])

teamwerx.run(['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
  $rootScope.logout = function () {
    $window.location.href = '/logout'
  }

  function getCurrentUser () {
    $http.post('/currentuser').then(function success (res) {
      $rootScope.user = res.data
    }, function error (e) {
      $window.location.href = '/#!/'
      console.warn(e)
    })
  }

  getCurrentUser()
}])
