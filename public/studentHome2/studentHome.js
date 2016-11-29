var studentHome = angular.module('teamwerx.studentHome2', ['ngRoute'])

studentHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/home2', {
    templateUrl: 'studentHome2/studentHome.html',
    controller: 'studentHome2Ctrl',
    controllerAs: 'ctrl'
  })
}])

studentHome.controller('studentHome2Ctrl', function ($http, $mdDialog, $scope) {
  var ctrl = this

  var isGrouped = setInterval(function () {
    if ($scope.user) {
      clearTimeout(isGrouped)
      applyGrouped()
    }
  }, 50)

  function applyGrouped () {
    var classes = $scope.user.classes
    for (var i = 0; i < classes.length; i++) {
      classes[i].isInTeam = false
      for (var j = 0; j < classes[i].teams.length; j++) {
        var members = classes[i].teams[j].members
        for (var k = 0; k < members.length; k++) {
          if (members[k].email === $scope.user.email) {
            classes[i].isInTeam = true
          }
        }
      }
    }
  }

  function init () {
  }
  init()
})
