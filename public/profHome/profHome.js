var profHome = angular.module('teamwerx.profHome', ['ngRoute'])

profHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/prof/home', {
    templateUrl: 'profHome/profHome.html',
    controller: 'profHomeCtrl'
  })
}])

profHome.controller('profHomeCtrl', function ($scope, $mdDialog) {
  $scope.teams = [{"name": "undefined", "members": ["Curry, DG, KD, KT"]},
                  {"name": "undefined2", "members": ["Curry, DG, KD, KT"]},
                  {"name": "undefined2", "members": ["Curry, DG, KD, KT"]},
  ]

  $scope.unmatched = [{"name": "Kobe"}, {"name": "MAMBA"}, {"name": "DG"}, {"name": "OJ"}]

  $scope.showAddClass = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      templateUrl: 'profHome/addClassModal.html',
      controller: 'addClassModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    })
  }

})
