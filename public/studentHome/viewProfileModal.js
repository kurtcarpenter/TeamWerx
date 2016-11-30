/* global FileReader */

var viewProfileModal = angular.module('teamwerx.viewProfileModal', [])
viewProfileModal.controller('viewProfileModalCtrl', ['$mdDialog', '$http', 'email', function ($mdDialog, $http, email) {
  var ctrl = this
  console.log('Profile email: ' + email)

  ctrl.closeDialog = function (newClass) {
    $mdDialog.hide(newClass)
  }

  function init() {
    $http({
      url: '/api/student/profile',
      method: "GET",
      params: {email: email}
    }).then(function success (res) {
      ctrl.profile = JSON.parse(res.data.profile)
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.team = null
      console.warn(e)
    })
  }
  init()
}])
