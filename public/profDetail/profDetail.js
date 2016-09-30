var profDetail = angular.module('teamwerx.profDetail', ['ngRoute'])

profDetail.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/prof/detail', {
    templateUrl: 'profDetail/profDetail.html',
    controller: 'profDetailCtrl'
  })
}])

profDetail.controller('profDetailCtrl', function ($scope, $mdDialog) {
  $scope.teams = [{"name": "undefined", "members": ["Curry, DG, KD, KT"]},
                  {"name": "undefined2", "members": ["Curry, DG, KD, KT"]},
                  {"name": "undefined2", "members": ["Curry, DG, KD, KT"]},
  ]

  $scope.unmatched = [{"name": "Kobe"}, {"name": "MAMBA"}, {"name": "DG"}, {"name": "OJ"}]

  $scope.showAddClass = function ($event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      templateUrl: 'profDetail/addClassModal.html',
      controller: 'addClassModalCtrl',
      controllerAs: 'ctrl',
      targetEvent: $event
    })
  }
})
