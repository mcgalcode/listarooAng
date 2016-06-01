angular.module("listaroo")
  .controller("listCtrl", function($scope, listService) {
      $scope.message = "Hi";
      listService.getLists(function(response) {
          console.log(response.data);
          $scope.lists = response.data;
      });

      $scope.deleteList = function(list) {
        listService.deleteList(list);
      }

      $scope.deleteListItem = function(listItem) {
        listService.deleteListItem(listItem);
      }
  });
