var profHome = angular.module('teamwerx.profHome', ['ngRoute'])

profHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/prof/home', {
    templateUrl: 'profHome/profHome.html',
    controller: 'profHomeCtrl'
  })
}])

profHome.controller('profHomeCtrl', function ($scope) {

})
