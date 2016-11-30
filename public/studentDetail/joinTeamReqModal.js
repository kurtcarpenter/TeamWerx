var joinTeamReqModal = angular.module('teamwerx.joinTeamReqModal', [])

joinTeamReqModal.controller('joinTeamReqModalCtrl', ['$scope', '$mdDialog', '$http', 'item', function ($scope, $mdDialog, $http, item) {
  var ctrl = this

  $scope.message = ''

  ctrl.currTeam = item
  console.warn(item)

  ctrl.closeDialog = function (thing) {
    $mdDialog.hide(thing)
  }

  ctrl.sendReq = function () {
    console.log('attempting to send team-join-request')
    console.log($scope.message)
    $http.put('/api/team/req/' + ctrl.currTeam._id).then(function success (res) {
      ctrl.closeDialog(res.data)
    }, function error (e) {
      console.warn('Could not join this team.')
      console.warn(e)
    })
  }
}])
