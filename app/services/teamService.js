angular.module("listaroo").
  service("teamService", function($http, $rootScope) {

    var rootUrl = $rootScope.baseUrl;

    this.getCreatedTeamsFromUser = function(userId, successCallback) {
      $http.get(
        rootUrl + "/api/teams?userId=" + userId + "&type=created"
      ).then(successCallback);
    };

    this.getInvitedTeamsFromUser = function(userId, successCallback) {
      $http.get(
        rootUrl + "/api/teams?userId=" + userId + "&type=invited"
      ).then(successCallback)
    };

    this.addTeam = function(team, successCallback, errorCallback) {
      $http.post(
        rootUrl + "/api/teams",
        team
      ).then(successCallback, errorCallback);
    };

    this.getTeam = function(teamId, successCallback) {
      $http.get(
        rootUrl + "/api/teams/" + teamId
      ).then(successCallback);
    }

    this.deleteTeam = function(teamId, successCallback) {
      $http.delete(
        rootUrl + "/api/teams/" + teamId
      ).then(successCallback);
    }

    this.inviteToTeam = function(username, teamId, successCallback, errorCallback) {
      $http.post(
        rootUrl + "/api/teams/" + teamId + "/invite",
        {
          "username" : username
        }
      ).then(successCallback, errorCallback);
    }


  });
