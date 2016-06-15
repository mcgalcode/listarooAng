angular.module("listaroo").
  component("signUp", {
    templateUrl: "/views/signup.html",
    controller: function($scope, $cookies, $location, signUpService) {

      $scope.submitSignUp = function() {
        signUpService.submitSignUp($scope.user, function(response) {
          $cookies.putObject('user', response.data);
          $scope.userId = $cookies.getObject('user').id;
          $location.path('/teams');
        });
      }
    }
  });
