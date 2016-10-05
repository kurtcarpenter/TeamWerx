var addClassModal = angular.module('teamwerx.addClassModalCtrl', [])

addClassModal.controller('addClassModalCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
  var ctrl = this
  
  ctrl.closeDialog = function () {
    return $mdDialog.hide()
  }

}])
