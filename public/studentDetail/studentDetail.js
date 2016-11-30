var studentDetail = angular.module('teamwerx.studentDetail', ['ngRoute'])

studentDetail.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/detail/:id', {
    templateUrl: 'studentDetail/studentDetail.html',
    controller: 'studentDetailCtrl',
    controllerAs: 'ctrl'
  })
}])

studentDetail.controller('studentDetailCtrl', function ($http, $scope, $mdDialog, $routeParams) {
  var ctrl = this
  ctrl.classId = $routeParams.id

  var timey = setInterval(function () {
      if ($scope.user) {
        clearTimeout(timey)
        init()
      }
  }, 50)

  function init () {
    getClass()
    getMyTeam()
    getTeams()
  }

  ctrl.showProfile = function (email, $event) {
    $mdDialog.show({
      locals: { email: email },
      clickOutsideToClose: true,
      templateUrl: 'studentHome/viewProfileModal.html',
      controller: 'viewProfileModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    }).then(function (result) {
      console.log('Opened profile')
    })
  }

  function getMyTeam() {
    $http.get('/api/team/member/' + $scope.user._id + '/' + $routeParams.id).then(function success (res) {
      ctrl.team = res.data.team
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.team = null
      console.warn(e)
    })
  }

  function getClass () {
    $http.get('/api/class/' + ctrl.classId).then(function success (res) {
      ctrl.class = res.data
    }, function error (e) {
      console.warn('Something went wrong.')
      console.warn(e)
    })
  }

  function getTeams () {
    $http.get('/api/team/class/' + ctrl.classId).then(function success (res) {
      ctrl.teams = res.data.teams
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.teams = []
      console.warn(e)
    })
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

  ctrl.getEmailLink = function (team) {
    var ret = 'mailto:'
    for (var i = 0; i < team.members.length; i++) {
      ret += team.members[i].email + ';'
    }
    return ret
  }

  ctrl.acceptMember = function (mem) {
    ctrl.judgeMember(mem, true)
  }

  ctrl.rejectMember = function (mem) {
    ctrl.judgeMember(mem, false)
  }

  ctrl.judgeMember = function (mem, accept) {
    $http.get('/api/team/' + ctrl.team._id + '/' + mem._id, {params: {accept: accept}}).then(function success (res) {
      console.log("success")
      getTeams()
    }, function error (e) {
      console.warn('Something went wrong.')
      console.warn(e)
    })
  }
})
