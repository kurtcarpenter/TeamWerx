var profHome = angular.module('teamwerx.profHome', ['ngRoute'])

profHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/prof/home', {
    templateUrl: 'profHome/profHome.html',
    controller: 'profHomeCtrl',
    controllerAs: 'ctrl'
  })
}])

profHome.controller('profHomeCtrl', function ($http, $mdDialog) {
  var ctrl = this
  function getClasses () {
    $http.get('/api/class/').then(function success (res) {
      ctrl.classes = res.data.classes
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.classes = []
      console.warn(e)
    })
  }

  ctrl.showAddClass = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      templateUrl: 'profHome/addClassModal.html',
      controller: 'addClassModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    }).then(function (newClass) {
      console.log(newClass)
      if (newClass) {
        // TODO: Go to the new class.
        ctrl.classes.push(newClass)
      }
    })
  }

  function init () {
    getClasses()
  }
  init()
})
