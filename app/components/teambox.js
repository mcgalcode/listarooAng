angular.module("listaroo").
  component("teamBox", {
    templateUrl: "teams.html",
    controller: function($scope, $cookies, $location, teamService, sessionService) {


      setCurrentUser();
      getTeamsFromUser($scope.user.id);


      function getTeamsFromUser(userId) {
        teamService.getCreatedTeamsFromUser(userId, function(response) {
          $scope.createdTeams = response.data;
        })
        teamService.getInvitedTeamsFromUser(userId, function(response) {
          $scope.invitedTeams = response.data;
        });
      }

      $scope.logout = function() {
        sessionService.logout($scope.user.id, function(response) {
          $cookies.remove('user');
          $location.path('/login');
        });
      }

      $scope.goToTeam = function(team) {
        $location.path("/teams/" + team.id + "/lists");
      }

      $scope.addTeam = function(teamName) {
        team = {
          'name' : teamName,
          'creatorId' : $scope.user.id
        }
        teamService.addTeam(team, function(response) {
          $scope.createdTeams.push(response.data);
        });
      }

      function setCurrentUser() {
        if ($cookies.getObject("user")) {
          $scope.user = $cookies.getObject("user");
        } else {
          $location.path("/login");
        }
      }
    }
  });
