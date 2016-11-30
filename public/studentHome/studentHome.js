var studentHome = angular.module('teamwerx.studentHome', ['ngRoute'])

studentHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/home', {
    templateUrl: 'studentHome/studentHome.html',
    controller: 'studentHomeCtrl',
    controllerAs: 'ctrl'
  })
}])

studentHome.controller('studentHomeCtrl', function ($http, $mdDialog, $scope) {
  var ctrl = this

  ctrl.showProfile = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      templateUrl: 'studentHome/viewProfileModal.html',
      controller: 'viewProfileModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    }).then(function (result) {
      console.log('Opened profile')
    })
  }

  var isGrouped = setInterval(function () {
    if ($scope.user && $scope.user.classes) {
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
