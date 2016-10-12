var createTeamModal = angular.module('teamwerx.createTeamModalCtrl', [])

createTeamModal.controller('createTeamModalCtrl', ['$mdDialog', '$http', function ($mdDialog, $http) {
  var ctrl = this

  ctrl.class = {}

  ctrl.closeDialog = function (newTeam) {
    $mdDialog.hide(newTeam)
  }

  ctrl.createTeam = function () {
    if (!ctrl.team.name ) {
      console.warn(ctrl.team)
      return console.warn('Please fill out all required fields.')
    }
    // TODO: api post for creating new team
    // $http.post('/api/class', ctrl.team).then(function success (res) {
    //   ctrl.closeDialog(res.data)
    // }, function error (e) {
    //   console.warn('Could not create a new team.')
    //   console.warn(e)
    // })
  }
}])
