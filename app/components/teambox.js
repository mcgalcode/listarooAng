angular.module("listaroo").
  component("teamBox", {
    templateUrl: "/views/teams.html",
    controller: function($scope, $cookies, $location, teamService, sessionService) {


      $scope.loadingCreated = false;
      $scope.loadingInvited = false;

      setCurrentUser();

      $scope.clearErrors = function() {
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
      }

      function getTeamsFromUser(userId) {
        $scope.loadingCreated = true;
        $scope.loadingInvited = true;
        teamService.getCreatedTeamsFromUser(userId, function(response) {
          $scope.createdTeams = response.data;
          $scope.loadingCreated = false;
        })
        teamService.getInvitedTeamsFromUser(userId, function(response) {
          $scope.invitedTeams = response.data;
          $scope.loadingInvited = false;
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
        $scope.errorsPresent = false;
        $scope.errorMessages = [];

        team = {
          'name' : teamName,
          'creatorId' : $scope.user.id
        }
        teamService.addTeam(team,
          function(response) {
            $scope.createdTeams.push(response.data);
          },
          function(response) {
              $scope.errorsPresent = true;
              for (var k = 0; k < response.data.errors.length; k++) {
                $scope.errorMessages.push(response.data.errors[k]);
              }
              $scope.newTeamName = "";
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
