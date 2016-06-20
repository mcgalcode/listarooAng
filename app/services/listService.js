angular.module("listaroo")

  .service("listService", function($http, $rootScope) {
    var rootUrl = $rootScope.baseUrl;

    this.getLists = function(teamId, callback) {
      $http.get(rootUrl + "/api/lists.json?teamId=" + teamId)
        .then(callback);
    }

    this.getList = function(id, callback) {
      $http.get(rootUrl + '/api/lists/' + id)
        .then(callback)
    }

    this.addList = function(teamId, parentListId, listTitle, successCallback, errorCallback) {
      $http({
        method: 'POST',
        url: rootUrl + '/api/lists',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          "title" : listTitle,
          "teamId" : teamId,
          "parentListId" : parentListId
        }
      }).then(successCallback, errorCallback);
    }

    this.deleteList = function(list, successCallback, errorCallback) {
      $http({
        method: 'DELETE',
        url: rootUrl + '/api/lists/' + list.id
      }).then(successCallback, errorCallback);
    }

    this.updateList = function(list, callback) {
      $http({
        method: 'PUT',
        url: rootUrl + '/api/lists/' + list.id,
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          'title': list.title
        }
      }).then(callback);
    }
  });
