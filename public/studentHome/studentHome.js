var studentHome = angular.module('teamwerx.studentHome', ['ngRoute'])

studentHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/home', {
    templateUrl: 'studentHome/studentHome.html',
    controller: 'studentHomeCtrl'
  })
}])

studentHome.controller('studentHomeCtrl', function ($scope) {

})
