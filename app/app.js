var mod = angular.module("listaroo", ['ngRoute', 'ngCookies']);
  mod.config(function($routeProvider) {


    $routeProvider
      .when('/teams/:teamId/lists', {
          template: '<list-box></list-box>'
      })
      .when('/signup', {
        template: '<sign-up></sign-up>'
      })
      .when('/login', {
        template: '<sessions></sessions>'
      })
      .when('/teams', {
        template: '<team-box></team-box>'
      });
  });

mod.run(function($rootScope) {
    $rootScope.baseUrl = "http://localhost:3000";
});
