var studentDetail = angular.module('teamwerx.studentDetail', ['ngRoute'])

studentDetail.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/detail', {
    templateUrl: 'studentDetail/studentDetail.html',
    controller: 'studentDetailCtrl',
    controllerAs: 'ctrl'
  })
}])

studentDetail.controller('studentDetailCtrl', function ($http, $mdDialog) {
  var ctrl = this

  function getTeams() {
    // TODO: teams api call
    // $http.get('/api/team').then(function success (res) {
    //   ctrl.teams = res.data.teams
    // }, function error (e) {
    //   console.warn('Something went wrong.')
    //   ctrl.teams = []
    //   console.warn(e)
    // })

    // for test
    ctrl.teams = [{'name': 'team1', 'roster':['a','b'], 'capacity': 4}, {'name': 'team2', 'roster':['a','b', 'c'], 'capacity': 4}, {'name':'team3', 'roster':['a'], 'capacity': 3}, {'name':'team4', 'roster':['a','b', 'a', 'b'], 'capacity': 4}]
  }
  
  ctrl.showCreateTeam = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,  
      templateUrl: 'studentDetail/createTeamModal.html',
      controller: 'createTeamModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    }).then(function (newTeam) {
      if (newTeam) {
        // TODO: Go to the new team.
        // ctrl.classes.push(newClass)
      }
    })
  }

  function init() {
    getTeams()

    
  }

  init()
})
