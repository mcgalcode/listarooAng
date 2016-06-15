angular.module("listaroo").
  component("teamBox", {
    templateUrl: "/views/teams.html",
    controller: function($scope, $cookies, $location, teamService, sessionService) {


      setCurrentUser();


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

      $scope.deleteTeam = function(createdTeam, teamId) {
        teamService.deleteTeam(teamId, function(response) {
          if (createdTeam) {
            var teamIndex = findEntityById($scope.createdTeams, teamId);
            $scope.createdTeams.splice(teamIndex, 1);
          } else {
            var teamIndex = findEntityById($scope.invitedTeams, teamId);
            $scope.invitedTeams.splice(teamIndex, 1);
          }
        });
      }

      function findEntityById(entityArray, id) {
        for ( k = 0; k < entityArray.length; k++ ) {
          if ( entityArray[k].id ===  id ) {
            return k;
          }
        }
        return null;
      }

      function setCurrentUser() {
        if ($cookies.getObject("user")) {
          $scope.user = $cookies.getObject("user");
          getTeamsFromUser($scope.user.id);
        } else {
          $location.path("/login");
        }
      }
    }
  });
