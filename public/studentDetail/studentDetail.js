var studentDetail = angular.module('teamwerx.studentDetail', ['ngRoute'])

studentDetail.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/detail/:id', {
    templateUrl: 'studentDetail/studentDetail.html',
    controller: 'studentDetailCtrl',
    controllerAs: 'ctrl'
  })
}])

studentDetail.controller('studentDetailCtrl', function ($http, $mdDialog, $routeParams) {
  var ctrl = this
  ctrl.classId = $routeParams.id

  ctrl.removeReq = function (ind) {
    ctrl.reqs.splice(ind, 1)
  }

  function getClass () {
    $http.get('/api/class/' + ctrl.classId).then(function success (res) {
      ctrl.class = res.data
      console.log(res.data)
    }, function error (e) {
      console.warn('Something went wrong.')
      console.warn(e)
    })
  }

  function getTeams () {
    $http.get('/api/team/class/' + ctrl.classId).then(function success (res) {
      ctrl.teams = res.data.teams
      console.log(res.data)
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.teams = []
      console.warn(e)
    })
  }

  function getReqs () {
    //TODO: get all reqs for current user and class
    ctrl.reqs = [{'student': { 'name': 'John Doe', 'email' : 'john@doe.com'}}, {'student': {'name': 'Jane Doe', 'email': 'jane@doe.com'}}]
  }

  ctrl.showCreateTeam = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {classInfo: ctrl.class, roster: ctrl.class.roster},
      templateUrl: 'studentDetail/createTeamModal.html',
      controller: 'createTeamModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    }).then(function (newTeam) {
      if (newTeam) {
        ctrl.classes.push(newTeam)
      }
    })
  }

  ctrl.showJoinTeam = function ($event, team) {
    if (team.members.length >= ctrl.class.maxGroup) {
      console.warn(team)
      return console.warn('This team is already full!')
    }
    $mdDialog.show({
      locals: { item: team },
      clickOutsideToClose: true,
      templateUrl: 'studentDetail/joinTeamReqModal.html',
      controller: 'joinTeamReqModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    })
  }

  function init () {
    getClass()
    getTeams()
    getReqs()
  }

  init()
})
