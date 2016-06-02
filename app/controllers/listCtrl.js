angular.module("listaroo")
  .controller("listCtrl", function($scope, $interval, listService) {
      $scope.message = "Hi";
      listService.getLists(function(response) {
          console.log(response.data);
          $scope.lists = response.data;
      });

      $scope.deleteList = function(list) {
        listService.deleteList(list, function(response) {
          var id = response.data.id;
          listIndex = findEntityById($scope.lists, id);
          $scope.lists.splice(listIndex, 1);
        });
      }

      $scope.deleteListItem = function(list, listItem) {
        listService.deleteListItem(listItem, function(response) {
          var id = response.data.id;
          listItemIndex = findEntityById(list.list_items, id);
          list.list_items.splice(listItemIndex, 1);
        });
      }

      $scope.addListItem = function(list, content) {
        listService.addListItem(list, content, function(response) {
          list.list_items.push(response.data)
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


  });
