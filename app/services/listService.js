angular.module("listaroo")

  .service("listService", function($http) {
    var rootUrl = "http://localhost:3000"

    this.getLists = function(callback) {
      $http.get(rootUrl + "/api/lists.json")
        .then(callback);
    }

    this.addList = function(listTitle, callback) {
      $http({
        method: 'POST',
        url: rootUrl + '/api/lists',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          title: listTitle
        }
      }).then(callback);
    }

    this.deleteList = function(list, callback) {
      $http({
      method: 'DELETE',
      url: rootUrl + '/api/lists/' + list.id
      }).then(callback);
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

    this.deleteListItem = function(listItem, callback) {
      $http.delete(rootUrl + '/api/list_items/' + listItem.id)
        .then(callback);
    }

    this.addListItem = function(list, item_content, callback) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/list_items',
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          'list_item' : {
            'content' : item_content,
            'list_id' : list.id
          }
        }
      })
        .then(callback);
    }

    this.updateListItem = function(list_item, callback) {
      $http({
        method: 'PUT',
        url: 'http://localhost:3000/api/list_items/' + list_item.id,
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          'content' : list_item.content
        }
      }).then(callback);
    }

  });
