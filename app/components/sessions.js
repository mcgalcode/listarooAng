angular.module("listaroo").
  component("sessions", {
    templateUrl: '/views/login.html',
    controller: function($scope, $cookies, $location, sessionService) {

      $scope.errorsPresent = false;
      $scope.errorMessages = [];
      $scope.usernameRequired = "You must provide a username to log in"
      $scope.passwordRequired = "You must provide a password to log in"
      $scope.loading = false;

      checkLoggedIn();

      $scope.clearErrors = function() {
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
      }

      $scope.submitLogin = function() {
        username = $scope.username;
        password = $scope.password;
        $scope.loading = true;
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
        if (!$scope.errorsPresent) {
          sessionService.submitLogin(username, password,
            function(response) {
              $cookies.putObject('user', response.data);
              $location.path('/teams');
              $scope.loading = false;
            },
            function(response) {
              $scope.errorsPresent = true;
              $scope.errorMessages.push(response.data.errors)
              $scope.username = "";
              $scope.password = "";
              $scope.loading = false;
            }
          );
        }
      }

      function checkLoggedIn() {
        if (!!$cookies.getObject('user')) {
          $location.path('/teams');
        }
      }

    }
  });
