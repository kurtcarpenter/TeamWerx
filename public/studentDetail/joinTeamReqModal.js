var joinTeamReqModal = angular.module('teamwerx.joinTeamReqModal', [])

joinTeamReqModal.controller('joinTeamReqModalCtrl', ['$scope', '$mdDialog', 'item', function ($scope, $mdDialog, item) {
  var ctrl = this;

  $scope.message = "";

  ctrl.currTeam = item;
  ctrl.currTeam.description = "- No description available -";
  console.warn(item);

  ctrl.closeDialog = function (thing) {
    $mdDialog.hide(thing)
  }

  ctrl.sendReq = function() {
    console.log("attempting to send team-join-request");
    console.log($scope.message);
    // TODO: api post for submitting request
    // $http.post('/api/team', ctrl.currTeam, user).then(function success (res) {
    //   ctrl.closeDialog(res.data)
    // }, function error (e) {
    //   console.warn('Could not join this team.')
    //   console.warn(e)
    // })
  }

}])
