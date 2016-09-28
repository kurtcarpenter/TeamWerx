'use strict'

var teamwerx = angular.module('teamwerx', [
  'ngAria',
  'ngAnimate',
  'ngMessages',
  'ngRoute',
  'ngResource',
  'ngMaterial',
  'teamwerx.welcome',
  'teamwerx.profHome',
  'teamwerx.studentHome'
])

teamwerx.config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {
  // Just for Kurt
  $locationProvider.hashPrefix('!')
}])
