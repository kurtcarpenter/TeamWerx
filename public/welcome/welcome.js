var welcome = angular.module('teamwerx.welcome', ['ngRoute'])

welcome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'welcome/welcome.html',
    controller: 'welcomeCtrl'
  })
}])

welcome.controller('welcomeCtrl', function ($scope) {

})
