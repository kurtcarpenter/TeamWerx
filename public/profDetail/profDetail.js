var profDetail = angular.module('teamwerx.profDetail', ['ngRoute'])

profDetail.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/prof/detail/:id', {
    templateUrl: 'profDetail/profDetail.html',
    controller: 'profDetailCtrl',
    controllerAs: 'ctrl'
  })
}])

profDetail.controller('profDetailCtrl', function ($scope, $mdDialog, $routeParams, $http) {
  var ctrl = this

  ctrl.createTeam = function () {
    var data = {
      classId: $routeParams.id,
      members: []
    }
    $http.post('/api/team/', data).then(function success (res) {
      if (res.status < 300) {
        getClass()
      } else {
        console.warn('Something went wrong!')
      }
    }, function error (e) {
      console.warn(e)
    })
  }

  ctrl.assignStudent = function (p) {
    $http.post('/api/team/' + p.assignTo + '/' + p._id).then(function success (res) {
      if (res.status < 400) {
        console.warn("Successfully assigned student")
        getClass()
      } else {
        console.warn("Something went wrong!")
      }
    }, function error (e) {
      console.warn('Something went wrong.')
      console.warn(e)
    })
  }

  ctrl.assignUnmatched = function () {
    $http.post('/api/class/' + $routeParams.id + '/match', { preserveTeams: true }).then(function success (res) {
      if (res.status < 400) {
        console.warn("Successfully matched all students")
        getClass()
      } else {
        console.warn("Something went wrong!")
      }
    }, function error (e) {
      console.warn("Something went wrong")
      console.warn(e)
    })
  }

  $scope.showAddClass = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      templateUrl: 'profDetail/addClassModal.html',
      controller: 'addClassModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    })
  }

  function getClass () {
    $http.get('/api/class/' + $routeParams.id).then(function success (res) {
      ctrl.class = res.data
      findUnmatched()
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.class = {}
      console.warn(e)
    })
  }

  function init () {
    getClass()
  }
  init()

  function findUnmatched() {
    ctrl.unmatched = []
    for (var i = 0; i < ctrl.class.roster.length; i++) {
      var student = ctrl.class.roster[i]
      var matched = false
      for (var j = 0; j < ctrl.class.teams.length; j++) {
        for (var k = 0; k < ctrl.class.teams[j].members.length; k++) {
          var cur = ctrl.class.teams[j].members[k]
          if (cur.email === student.email) {
            matched = true
          }
        }
      }
      if (!matched) {
        student.assignTo = undefined
        ctrl.unmatched.push(student)
      }
    }
  }

  ctrl.getEmailLink = function (team) {
    console.log(team)
    var ret = 'mailto:'
    for (var i = 0; i < team.members.length; i++) {
      ret += team.members[i].email + ';'
    }
    return ret
  }
})
