var createTeamModal = angular.module('teamwerx.createTeamModal', [])

createTeamModal.controller('createTeamModalCtrl', ['$mdDialog', '$http', function ($mdDialog, $http) {
  var ctrl = this

  ctrl.team = {}

  var pendingSearch, cancelSearch = angular.noop;
  var cachedQuery, lastSearch;

  ctrl.allContacts = loadContacts();
  ctrl.contacts = [ctrl.allContacts[0]];
  ctrl.asyncContacts = [];
  ctrl.filterSelected = true;

  ctrl.querySearch = querySearch;

  function querySearch(criteria) {
    cachedQuery = cachedQuery || criteria;
    return cachedQuery ? ctrl.allContacts.filter(createFilterFor(cachedQuery)) : [];
  }

  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);

    return function filterFn(contact) {
      return (contact._lowername.indexOf(lowercaseQuery) != -1);;
    };

  }

  function loadContacts() {
    // TODO: load actual contacts...
    var contacts = [
        'Marina Augustine',
        'Oddr Sarno',
        'Nick Giannopoulos',
        'Narayana Garner',
        'Anita Gros',
        'Megan Smith',
        'Tsvetko Metzger',
        'Hector Simek',
        'Some-guy withalongalastaname'
      ];

      return contacts.map(function (c, index) {
        var cParts = c.split(' ');
        var contact = {
          name: c,
          email: cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com',
          image: 'http://lorempixel.com/50/50/people?' + index
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
  }

  ctrl.closeDialog = function (newTeam) {
    $mdDialog.hide(newTeam)
  }

  ctrl.createTeam = function () {
    if (!ctrl.team.name || !ctrl.team.capacity) {
      console.warn(ctrl.team)
      return console.warn('Please fill out all required fields.')
    }
    // TODO: 
    // ctrl.team.members.add(user)?

    // TODO: api post for creating new team
    // $http.post('/api/class', ctrl.team).then(function success (res) {
    //   ctrl.closeDialog(res.data)
    // }, function error (e) {
    //   console.warn('Could not create a new team.')
    //   console.warn(e)
    // })
  }
}])
