angular.module("listaroo")

  .service("listService", function($http) {
    var rootUrl = "http://localhost:3000"

    this.getLists = function(callback) {
      $http.get(rootUrl + "/api/lists.json")
        .then(callback);
    }

    this.getList = function(id, callback) {
      $http.get(rootUrl + '/api/lists/' + id)
        .then(callback)
    }

    this.addList = function(parentListId, listTitle, callback) {
      $http({
        method: 'POST',
        url: rootUrl + '/api/lists',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          "title" : listTitle,
          "parentListId" : parentListId
        }
      }).then(callback);
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
