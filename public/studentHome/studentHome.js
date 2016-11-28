var studentHome = angular.module('teamwerx.studentHome', ['ngRoute', 'ngMaterialDatePicker'])

studentHome.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/student/home', {
    templateUrl: 'studentHome/studentHome.html',
    controller: 'studentHomeCtrl'
  })
}])

studentHome.controller('studentHomeCtrl', function ($scope, $mdToast, $http, $rootScope) {
  $scope.createProfile = function (s) {
    // if (!s || !s.name || !s.detail || !s.skills || !s.startTime1 || !s.endTime1 || !s.startTime2 || !s.endTime2 || !s.startTime3 || !s.endTime3) {
    //   return showToast('Please fill out all fields!')
    // }
    console.log('creating student profile: ' + JSON.stringify(s))
    $http({
        url: './api/student',
        method: "GET",
        params: {email: $rootScope.user.email, profile: s}
     }).then(function success (res) {
       $rootScope.user = res.data
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



  function loadStudent () {
    $http.get('/api/class').then(function success (res) {
      ctrl.classes = res.data.classes
    }, function error (e) {
      console.warn('Something went wrong.')
      ctrl.classes = []
      console.warn(e)
    })
  }

  function init () {
    //loadStudent()
    console.log('loading student: ' + $scope.user)
  }
  init()
})
