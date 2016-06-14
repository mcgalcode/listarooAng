angular.module("listaroo").
  service("teamService", function($http) {

    var rootUrl = "http://localhost:3000";

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

    this.addTeam = function(team, successCallback) {
      $http.post(
        rootUrl + "/api/teams",
        team
      ).then(successCallback);
    };

    this.getTeam = function(teamId, successCallback) {
      $http.get(
        rootUrl + "/api/teams/" + teamId
      ).then(successCallback);
    }


  });
