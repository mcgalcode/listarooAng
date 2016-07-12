angular.module("listaroo").
  component("sessions", {
    templateUrl: '/views/login.html',
    controller: function($scope, $cookies, $location, sessionService) {

      // This flag is used in the CSS to show an error message if necessary
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
        // Before continuing, reset all the error message (in preparation for potential new ones)
        // and show a loading icon which will be hidden in callback
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
              // Report the errors to the UI by storign them in errorMEssages
              $scope.errorsPresent = true;
              $scope.errorMessages.push(response.data.errors)
              $scope.username = "";
              $scope.password = "";
              $scope.loading = false;
            }
          );
        }
      }

      // A user is said to be logged in if there is no cookie corresponding to him
      function checkLoggedIn() {
        if (!!$cookies.getObject('user')) {
          $location.path('/teams');
        }
      }

    }
  });
