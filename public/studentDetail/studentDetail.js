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

  ctrl.removeReq = function(ind) {
    ctrl.reqs.splice(ind, 1);
  }

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
    ctrl.teams = [{'name': 'team1', 'members':['Barack Obama','Joe Biden'], 'capacity': 4}, {'name': 'team2', 'members':['Stooge 1', 'Stooge 2', 'Stooge 3'], 'capacity': 4}, {'name':'team3', 'members':['Lone Wolf'], 'capacity': 3}, {'name':'team4', 'members':['James "I Know That You Want Me" Harden', 'James "Cuz I Am The Best" Harden', 'James "I Wear My Shirt Open" Harden', 'James "So You See My Chest" Harden'], 'capacity': 4}]
  }

  function getReqs() {
    //TODO: get all reqs for current user and class
    ctrl.reqs = [{'student': { 'name': 'John Doe', 'email' : 'john@doe.com'}}, {'student': {'name': 'Jane Doe', 'email': 'jane@doe.com'}}]
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

  ctrl.showJoinTeam = function ($event, team) {
    // TODO don't hardcode team size of 4 - need to add to the team model
    if (team.members.length >= 4) {
      console.warn(team);
      return console.warn('This team is already full!')
    }
    $mdDialog.show({
      locals: { item: team },
      clickOutsideToClose: true,
      templateUrl: 'studentDetail/joinTeamReqModal.html',
      controller: 'joinTeamReqModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    });
  }

  function init() {
    getTeams()
    getReqs()
    
  }

  init()
})
