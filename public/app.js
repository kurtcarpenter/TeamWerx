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
  'teamwerx.addClassModal',
  'teamwerx.studentDetail',
  'teamwerx.createTeamModal',
  'teamwerx.joinTeamReqModal'
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

// angular service to pass the team selected from the studentDetail page into the joinTeamReqModal
teamwerx.service('joinTeamService', function() {
  var teamToJoin = {};

  var getTeam = function() {
    return teamToJoin;
  };

  var setTeam = function(currTeam) {
    teamToJoin = currTeam;
  };

  return {
    getTeam: getTeam,
    setTeam: setTeam
  };

});
