var studentProfile = angular.module('teamwerx.studentProfile', ['ngRoute', 'ngMaterialDatePicker'])

studentProfile.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/profile', {
    templateUrl: 'studentProfile/studentProfile.html',
    controller: 'studentProfileCtrl'
  })
}])

studentProfile.controller('studentProfileCtrl', function ($scope, $mdToast, $http, $rootScope, $window) {
  $scope.createProfile = function (s) {
    // if (!s || !s.name || !s.detail || !s.skills || !s.startTime1 || !s.endTime1 || !s.startTime2 || !s.endTime2 || !s.startTime3 || !s.endTime3) {
    //   return showToast('Please fill out all fields!')
    // }
    console.log('creating student profile: ' + JSON.stringify(s))
    $http({
        url: '/api/student',
        method: "GET",
        params: {email: $scope.user.email, profile: s}
     }).then(function success (res) {
       $rootScope.user = res.data
       $window.location.href = '/#!/student/home'
     }, function error (e) {
       console.warn('Something went wrong.')
       console.warn(e)
     })
  }

  function showToast(text) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(text)
        .position('bottom left')
        .hideDelay(3000)
    );
  }
})
