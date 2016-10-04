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
  'teamwerx.addClassModalCtrl'
])

teamwerx.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
  // Just for Kurt
  $locationProvider.hashPrefix('!')
}])

teamwerx.run(['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
  $rootScope.logout = function () {
    $window.location.href = '/logout'
  }
}])
