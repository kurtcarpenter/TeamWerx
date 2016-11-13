/* global FileReader */

var addClassModal = angular.module('teamwerx.addClassModalCtrl', [])

addClassModal.controller('addClassModalCtrl', ['$mdDialog', '$http', function ($mdDialog, $http) {
  var ctrl = this

  ctrl.class = {}

  ctrl.closeDialog = function (newClass) {
    $mdDialog.hide(newClass)
  }

  function addClass (newClass, roster) {
    $http.post('/api/class', {
      class: newClass,
      roster: roster
    }).success(function (data) {
      ctrl.closeDialog(data)
    }).error(function error (e) {
      console.warn('Could not add a new class.')
      console.warn(e)
    })
  }

  ctrl.addClass = function () {
    if (!ctrl.class.name || !ctrl.class.semester || !ctrl.class.year || !ctrl.class.minGroup || !ctrl.class.maxGroup) {
      console.warn(ctrl.class)
      return console.warn('Please fill out all required fields.')
    }

    var rosterFile = document.getElementById('roster').files[0]
    console.log(rosterFile)
    if (!rosterFile) {
      console.warn('Please specify a student roster.')
    }

    var reader = new FileReader()
    reader.onloadend = function (e) {
      var data = e.target.result
      console.log(data)
      if (!data) {
        console.warn('Could not read student roster.')
      }
      addClass(ctrl.class, data)
    }
    reader.readAsText(rosterFile, 'UTF-8')
  }
}])
