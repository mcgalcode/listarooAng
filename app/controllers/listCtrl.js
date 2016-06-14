angular.module("listaroo")
  .controller("listCtrl", function($scope, $interval, listService) {

      $scope.viewingList = false;
      $scope.message = "Hi";
      $scope.currentList = {};
      $scope.parentListStack = [0];
      $scope.parentList = {};

      listService.getLists(function(response) {
          console.log(response.data);
          $scope.currentList.child_lists = response.data;
          $scope.currentList.title = "Your Team's Lists";
          $scope.currentList.id = 0;
      });

      $scope.setCurrentList = function(list) {
        $scope.getList(list.id)
      }

      $scope.setParentList = function(list) {
        $scope.parentList = list;
      }

      $scope.getCurrentListTitle = function() {
        return $scope.currentList.title;
      }

      $scope.getCurrentListId = function() {
        return $scope.currentList.id;
      }

      $scope.getCurrentListChildren = function() {
        return $scope.currentList.child_lists;
      }

      $scope.getList = function(listId) {
        if (listId == 0 ) {
          listService.getLists(function(response) {
              console.log(response.data);
              $scope.currentList.child_lists = response.data;
              $scope.currentList.id = 0;
              $scope.currentList.title = "Your Team's Lists";
          });
        } else {
          listService.getList(listId, function(response) {
            $scope.currentList = response.data;
          });
        }
      }

      $scope.addList = function(listTitle) {
        listService.addList($scope.currentList.id, listTitle, function(response) {
          $scope.currentList.child_lists.push(response.data);
        });
      }

      $scope.updateList = function(list) {
        listService.updateList(list, function(response) {
        });
      }

      $scope.deleteList = function(list) {
        listService.deleteList(list, function(response) {
          var id = response.data.id;
          listIndex = findEntityById($scope.currentList.child_lists, id);
          $scope.currentList.child_lists.splice(listIndex, 1);
        },
          function(response) {
            $scope.getList($scope.currentList.id);
          }
      );
      }

      $scope.deleteListItem = function(list, listItem) {
        listService.deleteListItem(listItem, function(response) {
          var id = response.data.id;
          listItemIndex = findEntityById(list.list_items, id);
          list.list_items.splice(listItemIndex, 1);
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
