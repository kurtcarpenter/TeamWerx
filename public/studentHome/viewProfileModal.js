/* global FileReader */

var viewProfileModal = angular.module('teamwerx.viewProfileModal', [])
viewProfileModal.controller('viewProfileModalCtrl', ['$mdDialog', '$http', function ($mdDialog, $http) {
  var ctrl = this

  ctrl.closeDialog = function (newClass) {
    $mdDialog.hide(newClass)
  }

}])
