var addClassModal = angular.module('teamwerx.addClassModalCtrl', [])

addClassModal.controller('addClassModalCtrl', ['$mdDialog', '$http', function ($mdDialog, $http) {
  var ctrl = this

  ctrl.class = {}

  ctrl.closeDialog = function (newClass) {
    $mdDialog.hide(newClass)
  }

  ctrl.addClass = function () {
    if (!ctrl.class.name || !ctrl.class.semester || !ctrl.class.year || !ctrl.class.minGroup || !ctrl.class.maxGroup) {
      console.warn(ctrl.class)
      return console.warn('Please fill out all required fields.')
    }
    $http.post('/api/class', ctrl.class).then(function success (res) {
      ctrl.closeDialog(res.data)
    }, function error (e) {
      console.warn('Could not add a new class.')
      console.warn(e)
    })
  }
}])
