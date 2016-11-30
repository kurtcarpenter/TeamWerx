var createTeamModal = angular.module('teamwerx.createTeamModal', [])

createTeamModal.controller('createTeamModalCtrl', ['$mdDialog', '$http', 'classInfo', 'roster', function ($mdDialog, $http, classInfo, roster) {
  var ctrl = this

  ctrl.team = {}

  // var cachedQuery

  // ctrl.allContacts = roster
  // ctrl.contacts = [ctrl.allContacts[0]]
  // ctrl.asyncContacts = []
  // ctrl.filterSelected = true
  //
  // ctrl.querySearch = querySearch
  //
  // function querySearch (criteria) {
  //   cachedQuery = cachedQuery || criteria
  //   return cachedQuery ? ctrl.allContacts.filter(createFilterFor(cachedQuery)) : []
  // }
  //
  // function createFilterFor (query) {
  //   var lowercaseQuery = angular.lowercase(query)
  //
  //   return function filterFn (contact) {
  //     return contact.name.toLowerCase().indexOf(lowercaseQuery) !== -1
  //   }
  // }

  ctrl.closeDialog = function (newTeam) {
    $mdDialog.hide(newTeam)
  }

  ctrl.createTeam = function () {
    if (!ctrl.team.name) {
      console.warn(ctrl.team)
      return console.warn('Please fill out all required fields.')
    }

    $http.post('/api/team/class/' + classInfo._id, ctrl.team).then(function success (res) {
      ctrl.closeDialog(res.data)
    }, function error (e) {
      console.warn('Could not create a new team.')
      console.warn(e)
    })
  }
}])
