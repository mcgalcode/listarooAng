angular.module("listaroo")
  .component("listBox", {
      templateUrl: "listbox.html",
      controller: function($scope, $cookies, $location, $routeParams, teamService, listService, sessionService) {

        $scope.viewingList = false;
        $scope.message = "Hi";
        $scope.currentList = {};
        $scope.parentListStack = [0];
        $scope.parentList = {};
        $scope.listTitleStack = [];

        checkLoggedIn();

        teamService.getTeam($routeParams["teamId"], function(response) {
          $scope.team = response.data;
          listService.getLists($scope.team.id, function(response) {
              $scope.currentList.child_lists = response.data;
              $scope.currentList.title = $scope.team.name;
              $scope.currentList.id = 0;
              $scope.listTitleStack.push($scope.currentList.title);
          });
        });



        $scope.logout = function() {
          sessionService.logout($scope.userId, function(response) {
            $cookies.remove('user');
            $location.path('/login');
          });
        }

        $scope.goToSubList = function(list) {
          $scope.listTitleStack.push(list.title);
          $scope.parentListStack.push(list.id);
          $scope.setParentList($scope.currentList);
          $scope.setCurrentList(list);
        }

        $scope.goBackToParent = function() {
          $scope.listTitleStack.pop();
          $scope.parentListStack.pop();
          $scope.getList($scope.parentListStack[$scope.parentListStack.length-1]);
        }

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
          listService.addList($scope.team.id, $scope.currentList.id, listTitle, function(response) {
            $scope.currentList.child_lists.push(response.data);
            $scope.newestListTitle = "";
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

        function findEntityById(entityArray, id) {
          for ( k = 0; k < entityArray.length; k++ ) {
            if ( entityArray[k].id ===  id ) {
              return k;
            }
          }
          return null;
        }

        function checkLoggedIn() {
          if (!$cookies.getObject('user')) {
            $location.path('/login');
          } else {
            $scope.userId = $cookies.getObject('user').id;
          }
        }
      }

  });
