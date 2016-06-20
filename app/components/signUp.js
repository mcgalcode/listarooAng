angular.module("listaroo").
  component("signUp", {
    templateUrl: "/views/signup.html",
    controller: function($scope, $cookies, $location, signUpService) {

      $scope.errorsPresent = false;
      $scope.errorMessages = [];

      $scope.clearErrors = function() {
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
      }

      $scope.submitSignUp = function() {
        $scope.errorsPresent = false;
        $scope.errorMessages = [];
        signUpService.submitSignUp($scope.user, function(response) {
          $cookies.putObject('user', response.data);
          $scope.userId = $cookies.getObject('user').id;
          $location.path('/teams');
        }, function(response) {
          $scope.errorsPresent = true;
          for (var k = 0; k < response.data.errors.length; k++) {
            $scope.errorMessages.push(response.data.errors[k]);
          }
        });
      }
    }
  });
